import {store} from '../../store';
import {listenForBoardStatus} from '../../listenForBoardStatus';
import {monsters} from '../../data/monsters';
import {drawAICard} from '../../reducers/gameState/ai';
import {changeBoardStatusAction, BOARD_STATUSES} from '../../../common/gameState/board';
import {changeMonsterController} from '../../../common/gameState/monsterController';
import {changeMonsterDirection} from '../../../common/gameState/monsterDirection';
import {getDistance} from '../../utils/getDistance';
import {moveMonster} from './positions';
import {endMonster, beginMonster} from '../../../common/gameState/knockedDownCharacters';
import {startPlayerTurn} from './playerTurn';

function processPick(options, gameState, dispatch, nextStatus, i = 0) {
	if (i >= options.length) {
		dispatch(changeBoardStatusAction.apply(null, nextStatus));
	}

	return options[i](gameState, dispatch).then((result) => {
		if (result === null) {
			return processPick(options, gameState, dispatch, nextStatus, i + 1);
		} else {
			nextStatus[1].target = result;
			dispatch(changeBoardStatusAction.apply(null, nextStatus));
		}
	});
}

function selectMonsterPosition(dispatch, positions) {
	return new Promise((resolve, reject) => {
		dispatch(changeBoardStatusAction(BOARD_STATUSES.showMonsterPositions, positions));

		const unsub = store.subscribe(() => {
			const { room } = store.getState();
			if (room.gameState.board.status === BOARD_STATUSES.showMonsterPositionsResult) {
				resolve(room.gameState.board.data);
				dispatch(changeBoardStatusAction(BOARD_STATUSES.generic));
				unsub();
			}
		});
	});
}

function getNewMonsterLocation(target, gameState, dispatch) {
	const playerPosition = gameState.positions['player' + (target + 1)];
	const monsterSize = gameState.monsterStats.size;

	const options = [];

	for (let i = 0; i < monsterSize; i++) {
		// above
		options.push([playerPosition[0] - i, playerPosition[1] + monsterSize]);
		// below
		options.push([playerPosition[0] - i, playerPosition[1] - 1]);
		// left
		options.push([playerPosition[0] - monsterSize, playerPosition[1] + i]);
		// right
		options.push([playerPosition[0] + 1, playerPosition[1] + i]);
	}

	// When comparing distances to move ignore monster size since the movement is the same no matter what size the monster is
	const distances = options.map((ele) => getDistance(1, gameState.positions.monster, ele));
	console.log(distances, options);

	const min = Math.min.apply(Math, distances);

	const results = options.filter((ele, i) => distances[i] === min);

	if (results.length === 0) {
		return Promise.reject('FAILURE! No valid spot for the monster! UNIMPLEMENTED!');
	} else if (results.length === 1) {
		return Promise.resolve(results[0]);
	} else {
		return selectMonsterPosition(dispatch, results);
	}
}

function attackPlayer(target, dispatch, speed, accuracy, damage) {
	const {room} = store.getState();
	const {gameState} = room;

	if (getDistance(gameState.monsterStats.size, gameState.positions.monster, gameState.positions['player' + (target + 1)]) === 1) {
		return new Promise((resolve, reject) => {
			try {
				dispatch(changeBoardStatusAction(BOARD_STATUSES.playerDamage, {speed, accuracy, damage, target}));

				const unsub = store.subscribe(() => {
					try {
						const {room: updated} = store.getState();
						if (updated.gameState.board.status === BOARD_STATUSES.playerDamageFinish) {
							resolve();
							dispatch(changeBoardStatusAction(BOARD_STATUSES.generic));
							unsub();
						}
					} catch (err) {
						reject(err);
					}
				});
			} catch (err) {
				reject(err);
			}
		});
	} else {
		return Promise.resolve();
	}
}

export function processAttack(target, gameState, dispatch, {move, speed, accuracy, damage}, nextStatus) {
	let promise = Promise.resolve();
	if (target !== null) {
		if (move) {
			promise = getNewMonsterLocation(target, gameState, dispatch).then((newLocation) => {
				dispatch(moveMonster(newLocation));
				const playerLoc = gameState.positions[`player${target + 1}`];
				const diffX = playerLoc[0] - newLocation[0];
				const diffY = playerLoc[1] - newLocation[1];
				if (diffY < -1) {
					dispatch(changeMonsterDirection('S'));
				} else if (diffX < 0) {
					dispatch(changeMonsterDirection('W'));
				} else if (diffX > 1) {
					dispatch(changeMonsterDirection('E'));
				} else {
					dispatch(changeMonsterDirection('N'));
				}
				return attackPlayer(target, dispatch, speed, accuracy, damage);
			});
		} else {
			promise = attackPlayer(target, dispatch, speed, accuracy, damage);
		}
	}
	promise.catch(console.error.bind(console, 'Failed while monster was attacking')).then(() => dispatch(changeBoardStatusAction.apply(null, nextStatus)));
}

function getAICard(room) {
	const cardName = room.gameState.ai.discard[0] || 'Basic Action';
	return monsters[room.gameState.monsterName].ai.cards[cardName];
}

export const startMonsterTurn = () => (
	(dispatch, getState) => {
		const {room, auth: user} = getState();
		const {gameState} = room;

		dispatch(beginMonster());

		if (gameState.monsterController === user.id) {
			dispatch(drawAICard());

			dispatch(processNextAction());
		}
	}
);

const processNextAction = (board = {data: {step: 0}}) => (
	(dispatch, getState) => {
		const {room, auth: user} = getState();
		const {gameState} = room;
		if (gameState.monsterController === user.id) {
			const action = getAICard(room).actions[board.data.step];
			if (action) {
				if (action.type === 'pick') {
					processPick(action.options, gameState, dispatch, [BOARD_STATUSES.processMonsterAction, {
						step: board.data.step + 1,
						target: board.data.target
					}]);
				} else if (action.type === 'attack') {
					processAttack(board.data.target, gameState, dispatch, action, [BOARD_STATUSES.processMonsterAction, {
						step: board.data.step + 1,
						target: board.data.target
					}]);
				} else {
					console.log('Skipping Special', action);
					dispatch(processNextAction({data: {step: board.data + 1}}));
				}
			} else {
				dispatch(passMonsterController());
				dispatch(endMonster());
				dispatch(startPlayerTurn());
			}
		}
	}
);

listenForBoardStatus(BOARD_STATUSES.processMonsterAction, processNextAction);

export const passMonsterController = () => (
	(dispatch, getState) => {
		const {room} = getState();
		let playerIds = [
			room.player1_id,
			room.player2_id,
			room.player3_id,
			room.player4_id
		];
		playerIds = playerIds.filter((val, idx) => playerIds.indexOf(val) === idx);
		let playerIdx = playerIds.indexOf(room.gameState.monsterController);
		playerIdx++;
		if (playerIdx >= playerIds.length) {
			playerIdx = 0;
		}
		dispatch(changeMonsterController(playerIds[playerIdx]));
	}
);
