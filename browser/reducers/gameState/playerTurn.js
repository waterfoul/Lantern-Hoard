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

// Gets player input for character movement
function getCharacterMoveInput(dispatch, character, availableCharacters) {
	return new Promise((resolve, reject) => {
		dispatch(changeBoardStatusAction(BOARD_STATUSES.showAvailableMovement, character));

		const unsub = store.subscribe(() => {
			const { room } = store.getState();
			if (room.gameState.board.status === BOARD_STATUSES.moveCharacter) {
				resolve(room.gameState.board.data);
				dispatch(changeBoardStatusAction(BOARD_STATUSES.playerTurn, {character, availableCharacters}));
				unsub();
			}
		});
	});
}

// Thunks
export const startSingleTurn = (character, availableCharacters = null) => (
	(dispatch, getState) => {
		const { room } = getState();
		if (!availableCharacters) {
			availableCharacters = room.gameState.board.data;
		}

		dispatch(changeBoardStatusAction(BOARD_STATUSES.playerTurn, {character, availableCharacters}));
		dispatch(changePlayerResources(1, 1));
	}
);

export const endSingleTurn = ({availableCharacters, character}) => (
	(dispatch, getState) => {
		console.log({availableCharacters, character});
		const nextChars = availableCharacters.filter((element) => element !== character);
		if (nextChars.length === 0) {
			dispatch(startMonsterTurn());
		} else if (nextChars.length === 0) {
			dispatch(startSingleTurn(nextChars[0], nextChars));
		} else {
			dispatch(changeBoardStatusAction(BOARD_STATUSES.selectActingCharacter, nextChars));
		}
	}
);

export const startPlayerTurn = () => (
	(dispatch, getState) => {
		dispatch(changeBoardStatusAction(BOARD_STATUSES.selectActingCharacter, [0, 1, 2, 3]));
	}
);

// Is a thunk that moves the character
export const moveCharacter = ({character, availableCharacters}) => (
	(dispatch, getState) => {
		getCharacterMoveInput(dispatch, character, availableCharacters)
			.then((coordinates) => {
				dispatch(moveToken(`player${character + 1}`, coordinates));
				dispatch(useMovement());
			});
	}
);

export const startAttack = (slot, weapon, automaticHits = 0, automaticWounds = 0, automaticCrits = 0, overrides = {}) => (
	(dispatch, getState) => {
		const item = Object.assign({}, items[weapon], overrides);
		const {room} = getState();
		if (item.traits.indexOf('cumbersome') !== -1) {
			dispatch(useMovement());
		}
		dispatch(useAction());
		dispatch(changeBoardStatusAction(BOARD_STATUSES.playerAttack, {
			item,
			slot,
			automaticHits,
			automaticWounds,
			automaticCrits,
			character: room.gameState.board.data.character,
			availableCharacters: room.gameState.board.data.availableCharacters
		}));
	}
);

export const rollToHit = () => (
	(dispatch, getState) => {
		const {room} = getState();
		const data = Object.assign({}, room.gameState.board.data);
		const monsterName = room.gameState.monsterName;
		const playerAcc = getAccuracy(room[`Character${data.slot + 1}`], room.gameState, data.slot, data.item.diceMods || {});

		data.hitRolls = [];
		data.hitCards = [];
		data.woundRolls = [];
		data.woundResults = [];
		data.trap = false;
		for (let i = 0; i < data.item.dice; i++) {
			let result = 0;
			if (data.automaticHits) {
				data.automaticHits--;
				result = 'auto';
			} else {
				result = Math.floor(Math.random() * 10) + 1;
			}
			data.hitRolls.push(result);
			if (result !== 1 && (result === 'auto' || result === 10 || (result - data.item.accuracy + playerAcc) >= 0)) {
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
		const playerStr = getStrength(room[`Character${data.slot + 1}`], room.gameState, data.slot, data.item.diceMods || {});
		const playerLuck = getLuck(room[`Character${data.slot + 1}`], room.gameState, data.slot, data.item.diceMods || {});
		const monsterName = room.gameState.monsterName;
		const card = monsters[monsterName].hl[data.hitCards[location]];
		let result = 0;

		if (data.automaticCrits) {
			result = 'auto-crit';
			data.automaticCrits--;
		} else if (data.automaticHits) {
			result = 'auto';
			data.automaticHits--;
		} else {
			result = Math.floor(Math.random() * 10) + 1;
		}
		data.woundRolls[location] = result;
		if (result === 1) {
			data.woundResults[location] = 'Fail';
			failTrigger(card, dispatch, getState);
		} else if (card.crit && (
				result === 'auto-crit' ||
				result + playerLuck + (data.item.diceMods && data.item.diceMods.luck || 0) >= 10
			)) {
			data.woundResults[location] = 'Crit';
			card.crit(dispatch, getState);
			dispatch(woundAI());
		} else if (result === 10 || result === 'auto-crit' || result === 'auto') {
			data.woundResults[location] = 'Success';
			woundTrigger(card, dispatch, getState);
			dispatch(woundAI());
		} else if ((result + playerStr) > room.gameState.monsterStats.toughness) {
			data.woundResults[location] = 'Success';
			woundTrigger(card, dispatch, getState);
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
		} else {
			dispatch(changeBoardStatusAction(BOARD_STATUSES.playerTurn, {character: data.character, availableCharacters: data.availableCharacters}));
		}
	}
);
