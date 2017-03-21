import {monsters} from '../../data/monsters';
import {drawAICard} from '../../../common/gameState/ai';

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

function processActions(actions, gameState, dispatch, target, i = 0) {
	if (actions[i].type === 'pick') {
		return processPick(actions[i].options, gameState, dispatch).then((result) => {
			return processActions(actions, gameState, dispatch, result, i + 1);
		});
	} if (actions[i].type === 'attack') {
		return Promise.reject('UNIMPLEMENTED');
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
				console.log('Begin Player turn');
			});
		}
	}
);
