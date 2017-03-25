import { startMonsterTurn } from './monsterController';
import { BOARD_STATUSES, changeBoardStatusAction } from '../../../common/gameState/board';
import { store } from '../../store';
import { moveToken } from '../../../common/gameState/positions';
import { changePlayerResources, useMovement, useAction } from '../../../common/gameState/playerResources';
import { drawHLCard, shuffleHL } from '../../reducers/gameState/hl';
import { woundAI } from '../../reducers/gameState/ai';
import { items } from '../../data/items';
import { getAccuracy, getStrength, getLuck } from '../../utils/getStats';
import { monsters } from '../../data/monsters';
import { playerHasWounded } from '../../../common/gameState/woundOrder';

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
		const {room} = getState();
		if (item.traits.indexOf('cumbersome') !== -1) {
			dispatch(useMovement());
		}
		dispatch(useAction());
		dispatch(changeBoardStatusAction(BOARD_STATUSES.playerAttack, {
			item,
			slot,
			character: room.gameState.board.data
		}));
	}
);

export const rollToHit = () => (
	(dispatch, getState) => {
		const {room} = getState();
		const data = Object.assign({}, room.gameState.board.data);
		const monsterName = room.gameState.monsterName;
		const playerAcc = getAccuracy(room[`Character${data.slot + 1}`], room.gameState, data.slot);

		data.hitRolls = [];
		data.hitCards = [];
		data.woundRolls = [];
		data.woundResults = [];
		data.trap = false;
		for (let i = 0; i < data.item.dice; i++) {
			const result = Math.floor(Math.random() * 10) + 1;
			data.hitRolls.push(result);
			if (result !== 1 && (result === 10 || (result - data.item.accuracy + playerAcc) >= 0)) {
				dispatch(drawHLCard());
				const {room: currentRoom} = getState();
				const currentName = currentRoom.gameState.hl.discard[0];
				const card = monsters[monsterName].hl[currentName];
				// Trap Hit! Stop drawing/Rolling
				if (card.trap) {
					i = data.item.dice;
					data.trap = currentName;
				}

				data.hitCards.push(currentName);
			} else {
				data.hitCards.push(null);
			}
			data.woundRolls.push(null);
			data.woundResults.push(null);
		}
		dispatch(changeBoardStatusAction(BOARD_STATUSES.playerAttack, data));
	}
);

const woundTrigger = (card, dispatch, getState) => (
	card.triggers && card.triggers
		.filter((trg) => trg.type === 'wound')
		.map((trg) => trg.action(dispatch, getState))
);

const failTrigger = (card, dispatch, getState) => (
	card.triggers && card.triggers
		.filter((trg) => trg.type === 'failure')
		.map((trg) => trg.action(dispatch, getState))
);

export const rollToWound = (location) => (
	(dispatch, getState) => {
		const {room} = getState();
		const data = Object.assign({}, room.gameState.board.data);
		const playerStr = getStrength(room[`Character${data.slot + 1}`], room.gameState, data.slot);
		const playerLuck = getLuck(room[`Character${data.slot + 1}`], room.gameState, data.slot);
		const result = Math.floor(Math.random() * 10) + 1;
		const monsterName = room.gameState.monsterName;
		const card = monsters[monsterName].hl[data.hitCards[location]];

		data.woundRolls[location] = result;
		if (result === 1) {
			data.woundResults[location] = 'Fail';
			failTrigger(card, dispatch, getState);
		} else if (card.crit && (
			result + playerLuck + (data.item.diceMods && data.item.diceMods.luck || 0) >= 10
		)) {
			data.woundResults[location] = 'Crit';
			card.crit(dispatch, getState);
			dispatch(playerHasWounded(room.gameState.board.data.slot));
			dispatch(woundAI());
		} else if (result === 10) {
			data.woundResults[location] = 'Success';
			woundTrigger(card, dispatch, getState);
			dispatch(playerHasWounded(room.gameState.board.data.slot));
			dispatch(woundAI());
		} else if ((result + playerStr) > room.gameState.monsterStats.toughness) {
			data.woundResults[location] = 'Success';
			woundTrigger(card, dispatch, getState);
			dispatch(playerHasWounded(room.gameState.board.data.slot));
			dispatch(woundAI());
		} else {
			data.woundResults[location] = 'Fail';
			failTrigger(card, dispatch, getState);
		}
		dispatch(changeBoardStatusAction(BOARD_STATUSES.playerAttack, data));
	}
);

export const closeAttack = () => (
	(dispatch, getState) => {
		const {room} = getState();
		const data = room.gameState.board.data;
		const monsterName = room.gameState.monsterName;
		if (data.trap) {
			const trapCard = monsters[monsterName].hl[data.trap];
			trapCard.action(dispatch, getState);

			dispatch(shuffleHL());
		}
		dispatch(changeBoardStatusAction(BOARD_STATUSES.playerTurn, data.character));
	}
);

