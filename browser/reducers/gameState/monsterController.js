import {monsters} from '../../data/monsters';
import {drawAICard} from '../../../common/gameState/ai';
import {changeBoardStatusAction, BOARD_STATUSES} from '../../../common/gameState/board';
import {changeMonsterController} from '../../../common/gameState/monsterController';
import {getDistance} from '../../utils/getDistance';
import {moveMonster} from './positions';
import {store} from '../../store';

function processPick(options, gameState, dispatch, i = 0) {
	if (i >= options.length) {
		return Promise.resolve(null);
	}

	return options[i](gameState, dispatch).then((result) => {
		if (result === null) {
			return processPick(options, gameState, dispatch, i + 1);
		}
		return result;
	});
}

function getNewMonsterLocation(target, gameState) {
	const playerPosition = gameState.positions['player' + (target + 1)];
	const monsterSize = gameState.monsterStats.size;

	const options = [];

	for (let i = 0; i < monsterSize; i++) {
		// above
		options.push([playerPosition[0] - i, playerPosition[1] + monsterSize]);
		// below
		options.push([playerPosition[0] - i, playerPosition[1] - 1]);
		// left
		options.push([playerPosition[0] - monsterSize, playerPosition[1] - i]);
		// right
		options.push([playerPosition[0] + 1, playerPosition[1] - i]);
	}

	const distances = options.map((ele) => getDistance(gameState.monsterStats.size, gameState.positions.monster, ele));

	const min = Math.min.apply(Math, distances);

	const results = options.filter((ele, i) => distances[i] === min);

	if (results.length === 0) {
		return Promise.reject('FAILURE! No valid spot for the monster! UNIMPLEMENTED!');
	} else if (results.length === 1) {
		return Promise.resolve(results[0]);
	} else {
		return Promise.reject('FAILURE! More than one result! UNIMPLEMENTED!');
	}
}

function attackPlayer(target, dispatch, speed, accuracy, damage) {
	const {room} = store.getState();
	const {gameState} = room;

	if (getDistance(gameState.monsterStats.size, gameState.positions.monster, gameState.positions['player' + (target + 1)]) === 1) {
		return new Promise((resolve, reject) => {
			dispatch(changeBoardStatusAction(BOARD_STATUSES.playerDamage, {speed, accuracy, damage, target}));

			const unsub = store.subscribe(() => {
				const {room: updated} = store.getState();
				if (updated.gameState.board.status === BOARD_STATUSES.playerDamageFinish) {
					resolve();
					dispatch(changeBoardStatusAction(BOARD_STATUSES.generic));
					unsub();
				}
			});
		});
	} else {
		return Promise.resolve();
	}
}

function processAttack(target, gameState, dispatch, {move, speed, accuracy, damage}) {
	if (move) {
		return getNewMonsterLocation(target, gameState).then((newLocation) => {
			dispatch(moveMonster(newLocation));
			return attackPlayer(target, dispatch, speed, accuracy, damage);
		});
	} else {
		return attackPlayer(target, dispatch, speed, accuracy, damage);
	}
}

function processActions(actions, gameState, dispatch, target, i = 0) {
	if (actions[i].type === 'pick') {
		return processPick(actions[i].options, gameState, dispatch).then((result) => {
			return processActions(actions, gameState, dispatch, result, i + 1);
		});
	} if (actions[i].type === 'attack') {
		return processAttack(target, gameState, dispatch, actions[i]);
	} else {
		return Promise.resolve();
	}
}

export const startMonsterTurn = () => (
	(dispatch, getState) => {
		const {room, auth: user} = getState();
		const {gameState} = room;

		console.log('Begin Monster turn');

		if (gameState.monsterController === user.id) {
			dispatch(drawAICard());
			const {room: updatedRoom} = getState();
			const nextCard = updatedRoom.gameState.ai.discard[0];

			const actions = monsters[gameState.monsterName].ai.cards[nextCard].actions;

			processActions(actions, gameState, dispatch).then(() => {
				dispatch(passMonsterController());
				console.log('Begin Player turn');
			});
		}
	}
);

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
		if (playerIdx > playerIds.length) {
			playerIdx = 0;
		}
		dispatch(changeMonsterController(playerIds[playerIdx]));
	}
);
