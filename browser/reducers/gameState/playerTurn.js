import { startMonsterTurn } from './monsterController';
import { BOARD_STATUSES, changeBoardStatusAction } from '../../../common/gameState/board';
import { store } from '../../store';
import { moveToken } from '../../../common/gameState/positions';
import { changePlayerResources, useMovement, useAction } from '../../../common/gameState/playerResources';
import { items } from '../../data/items';
import { getAccuracy } from '../../utils/getStats';

// Gets player input for selecting character turn
function selectActingCharacter(dispatch, characters) {
	if (characters.length === 1) {
		return Promise.resolve(characters[0]);
	}
	return new Promise((resolve, reject) => {
		dispatch(changeBoardStatusAction(BOARD_STATUSES.selectActingCharacter, characters));

		const unsub = store.subscribe(() => {
			const { room } = store.getState();
			if (room.gameState.board.status === BOARD_STATUSES.actingCharacterChosen) {
				resolve(room.gameState.board.data);
				dispatch(changeBoardStatusAction(BOARD_STATUSES.generic));
				unsub();
			}
		});
	});
}

// Gets player input for character movement
function getCharacterMoveInput(dispatch, character) {
	return new Promise((resolve, reject) => {
		dispatch(changeBoardStatusAction(BOARD_STATUSES.showAvailableMovement, character));

		const unsub = store.subscribe(() => {
			const { room } = store.getState();
			if (room.gameState.board.status === BOARD_STATUSES.moveCharacter) {
				resolve(room.gameState.board.data);
				dispatch(changeBoardStatusAction(BOARD_STATUSES.playerTurn, character));
				unsub();
			}
		});
	});
}

function waitForTurnEnd() {
	return new Promise((resolve, reject) => {
		const unsub = store.subscribe(() => {
			const { room } = store.getState();
			if (room.gameState.board.status === BOARD_STATUSES.characterTurnEnd) {
				resolve();
				unsub();
			}
		});
	});
}

function characterTurn(dispatch, availableCharacters = [0, 1, 2, 3]) {
	return selectActingCharacter(dispatch, availableCharacters)
		.then((player) => {
			dispatch(changeBoardStatusAction(BOARD_STATUSES.playerTurn, player));
			dispatch(changePlayerResources(1, 1));
			return waitForTurnEnd().then(() => player);
		})
		.then((player) => {
			if (availableCharacters.length > 1) {
				return characterTurn(dispatch, availableCharacters.filter((element) => element !== player));
			}
		});
}

// Thunks

// Is a thunk that moves the character
export const moveCharacter = (character) => (
	(dispatch, getState) => {
		console.log(character);
		getCharacterMoveInput(dispatch, character)
			.then((coordinates) => {
				dispatch(moveToken(`player${character + 1}`, coordinates));
				dispatch(useMovement());
			});
	}
);

export const startPlayerTurn = () => (
	(dispatch, getState) => {
		characterTurn(dispatch)
			.then(() => {
				dispatch(startMonsterTurn());
			});
	}
);

export const startAttack = (slot, weapon) => (
	(dispatch, getState) => {
		const item = items[weapon];
		if (item.traits.indexOf('cumbersome')) {
			dispatch(useMovement());
		}
		dispatch(useAction());
		dispatch(changeBoardStatusAction(BOARD_STATUSES.playerAttack, {
			item,
			slot
		}));
	}
);

export const rollToHit = () => (
	(dispatch, getState) => {
		const {room} = getState();
		const data = Object.assign({}, room.gameState.board.data);
		const playerAcc = getAccuracy(room[`Character${data.slot + 1}`], room.gameState, data.slot);
		data.hitRolls = [];
		data.hitCards = [];
		data.woundRolls = [];
		for (let i = 0; i < data.item.dice; i++) {
			const result = Math.floor(Math.random() * 10) + 1;
			data.hitRolls.push(result);
			if (result !== 1 && (result === 10 || (result - data.item.accuracy + playerAcc) >= 0)) {
				data.hitCards.push({});
			} else {
				data.hitCards.push(null);
			}
			data.woundRolls.push(null);
		}
		dispatch(changeBoardStatusAction(BOARD_STATUSES.playerAttack, data));
	}
);
