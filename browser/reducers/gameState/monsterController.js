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

// Internals
const processPick = (options, nextStatus) => (
	(dispatch, getState) => {
		const {room} = getState();
		const {gameState} = room;

		const recurse = (i) => {
			if (i >= options.length) {
				dispatch(changeBoardStatusAction.apply(null, nextStatus));
			}

			return options[i](gameState, dispatch).then((result) => {
				if (result === null) {
					return recurse(i + 1);
				} else {
					nextStatus[1].target = result;
					dispatch(changeBoardStatusAction.apply(null, nextStatus));
				}
			});
		};

		recurse(0);
	}
);

const getNewMonsterLocation = (target, {speed, accuracy, damage}, nextStatus) => (
	(dispatch, getState) => {
		const {room} = getState();
		const {gameState} = room;

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

		const min = Math.min.apply(Math, distances);

		const results = options.filter((ele, i) => distances[i] === min);

		if (results.length === 0) {
			throw new Error('FAILURE! No valid spot for the monster! UNIMPLEMENTED!');
		} else if (results.length === 1) {
			dispatch(attackAfterMove(target, {speed, accuracy, damage}, results[0], nextStatus));
		} else {
			dispatch(changeBoardStatusAction(BOARD_STATUSES.showMonsterPositions, {target, speed, accuracy, damage, results, nextStatus}));
		}
	}
);

const attackPlayer = (target, {speed, accuracy, damage}, nextStatus) => (
	(dispatch, getState) => {
		const {room} = getState();
		const {gameState} = room;

		if (getDistance(gameState.monsterStats.size, gameState.positions.monster, gameState.positions['player' + (target + 1)]) === 1) {
			dispatch(changeBoardStatusAction(BOARD_STATUSES.playerDamage, {speed, accuracy, damage, target, nextStatus}));
		} else {
			dispatch(changeBoardStatusAction.apply(null, nextStatus));
		}
	}
);

const processAttack = (target, action, nextStatus) => (
	(dispatch) => {
		if (target !== null) {
			if (action.move) {
				dispatch(getNewMonsterLocation(target, action, nextStatus));
			} else {
				dispatch(attackPlayer(target, action, nextStatus));
			}
		}
	}
);

const passMonsterController = () => (
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

const processNextAction = (board = {data: {step: 0}}) => (
	(dispatch, getState) => {
		const {room, auth: user} = getState();
		const {gameState} = room;
		if (gameState.monsterController === user.id) {
			const action = getAICard(room).actions[board.data.step];
			const nextState = [BOARD_STATUSES.processMonsterAction, {
				step: board.data.step + 1,
				target: board.data.target
			}];
			if (action) {
				if (action.type === 'pick') {
					dispatch(processPick(action.options, nextState));
				} else if (action.type === 'attack') {
					dispatch(processAttack(board.data.target, action, nextState));
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

function getAICard(room) {
	const cardName = room.gameState.ai.discard[0] || 'Basic Action';
	return monsters[room.gameState.monsterName].ai.cards[cardName];
}

// Results from UI
export const attackAfterMove = (target, action, newLocation, nextStatus) => (
	(dispatch, getState) => {
		const {room} = getState();
		const {gameState} = room;

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
		dispatch(attackPlayer(target, action, nextStatus));
	}
);

// Externals
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

// Wrapup
listenForBoardStatus(BOARD_STATUSES.processMonsterAction, processNextAction);
