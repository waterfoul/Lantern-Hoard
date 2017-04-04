import { startMonsterTurn } from './monsterController';
import { BOARD_STATUSES, changeBoardStatusAction } from '../../../common/gameState/board';
import { moveToken } from '../../../common/gameState/positions';
import { changePlayerResources, useMovement, useAction } from '../../../common/gameState/playerResources';
import { STATUSES } from '../../../common/gameState/knockedDownCharacters';
import { drawHLCard, shuffleHL } from '../../reducers/gameState/hl';
import { woundAI } from '../../reducers/gameState/ai';
import { items } from '../../data/items';
import { getAccuracy, getStrength, getLuck } from '../../utils/getStats';
import { monsters } from '../../data/monsters';

// Internals
const trigger = (card, type, dispatch, getState) => (
	card.triggers && card.triggers
		.filter((trg) => trg.type === type)
		.map((trg) => trg.action(dispatch, getState))
);

// UI Thunks
export const startSingleTurn = (character, availableCharacters = null) => (
	(dispatch, getState) => {
		const { room } = getState();
		if (!availableCharacters) {
			availableCharacters = room.gameState.board.data;
		}

		dispatch(changeBoardStatusAction(BOARD_STATUSES.playerTurn, { character, availableCharacters }));
		dispatch(changePlayerResources(1, 1));
	}
);

export const endSingleTurn = ({ availableCharacters, character }) => (
	(dispatch) => {
		const nextChars = availableCharacters.filter((element) => element !== character);
		dispatch(promptForCharacters(nextChars));
	}
);

export const promptForCharacters = (nextChars) => (
	(dispatch, getState) => {
		const { room } = getState();
		if (room.Character1.dead && room.Character2.dead && room.Character3.dead && room.Character4.dead) {
			dispatch(changeBoardStatusAction(BOARD_STATUSES.gameOver));
		} else {
			const validTurns = nextChars.filter((slot) => (
				room.gameState.knockedDownCharacters[slot] === STATUSES.standing && !room[`Character${slot + 1}`].dead
			));
			if (validTurns.length === 0) {
				dispatch(startMonsterTurn());
			} else if (validTurns.length === 1) {
				dispatch(startSingleTurn(validTurns[0], nextChars));
			} else {
				dispatch(changeBoardStatusAction(BOARD_STATUSES.selectActingCharacter, nextChars));
			}
		}
	}
);

export const finishMovement = (coordinates, { character, availableCharacters }) => (
	(dispatch) => {
		dispatch(moveToken(`player${character + 1}`, coordinates));
		dispatch(useMovement());
		dispatch(changeBoardStatusAction(BOARD_STATUSES.playerTurn, { character, availableCharacters }));
	}
);

export const rollToHit = () => (
	(dispatch, getState) => {
		const { room } = getState();
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
				const { room: currentRoom } = getState();
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

export const closeAttack = () => (
	(dispatch, getState) => {
		const { room } = getState();
		const data = room.gameState.board.data;
		const monsterName = room.gameState.monsterName;
		if (data.trap) {
			const trapCard = monsters[monsterName].hl[data.trap];
			trapCard.action(dispatch, getState);

			dispatch(shuffleHL());
		} else {
			dispatch(changeBoardStatusAction(BOARD_STATUSES.playerTurn, { character: data.character, availableCharacters: data.availableCharacters }));
		}
	}
);

function getMods (room, slot, item, gameState, diceMods) {
	const playerStr = getStrength(room[`Character${slot + 1}`], gameState, slot, item.diceMods || {});
	const playerLuck = getLuck(room[`Character${slot + 1}`], gameState, slot, item.diceMods || {});

	const mods = diceMods || {};

	mods.luck = playerLuck + (mods.luck || 0);
	mods.strength = playerStr + (mods.strength || 0);

	return mods;
}

// This is as simple as I can get it
// eslint-disable-next-line complexity
export const rollToWound = (location) => (dispatch, getState) => {
	const { room } = getState();
	const { gameState } = room;
	const { board } = gameState;
	const data = Object.assign({}, board.data);
	const monsterName = gameState.monsterName;
	const card = monsters[monsterName].hl[data.hitCards[location]];
	const mods = getMods(room, data.slot, data.item, gameState, data.item.diceMods);

	if (data.automaticCrits) {

		data.woundResults[location] = card.crit ? 'Crit' : 'Success';
		data.automaticCrits--;

	} else if (data.automaticHits) {

		data.woundRolls[location] = 'auto';
		data.woundResults[location] = 'Success';
		data.automaticHits--;

	} else {
		const result = Math.floor(Math.random() * 10) + 1;
		data.woundRolls[location] = result;

		// Update the data
		if (result === 1) {
			data.woundResults[location] = 'Fail';
		} else if (card.crit && (result + mods.luck) >= 10) {
			data.woundResults[location] = 'Crit';
		} else if (result === 10 || (result + mods.strength) > gameState.monsterStats.toughness) {
			data.woundResults[location] = 'Success';
		} else {
			data.woundResults[location] = 'Fail';
		}

	}

	// Change Status
	dispatch(changeBoardStatusAction(BOARD_STATUSES.playerAttack, data));

	// Dispatch actions, this might change the status again
	if (data.woundResults[location] === 'Fail') {

		trigger(card, 'failure', dispatch, getState);
		trigger(card, 'reflex', dispatch, getState);

	} else if (data.woundResults[location] === 'Crit') {

		card.crit(dispatch, getState);
		dispatch(woundAI(board.data.slot));

	} else if (data.woundResults[location] === 'Success') {

		trigger(card, 'wound', dispatch, getState);
		trigger(card, 'reflex', dispatch, getState);
		dispatch(woundAI(board.data.slot));

	}
};

// Externals
export const startPlayerTurn = () => (
	(dispatch) => {
		dispatch(promptForCharacters([0, 1, 2, 3]));
	}
);

export const moveCharacter = ({ character, availableCharacters }) => (
	(dispatch) => {
		dispatch(changeBoardStatusAction(BOARD_STATUSES.showAvailableMovement, {
			character,
			availableCharacters
		}));
	}
);

export const startAttack = (slot, weapon, automaticHits = 0, automaticWounds = 0, automaticCrits = 0, overrides = {}) => (
	(dispatch, getState) => {
		const item = Object.assign({}, items[weapon], overrides);
		const { room } = getState();
		const turnStatus = room.gameState.board;
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
			turnStatus,
			character: room.gameState.board.data.character,
			availableCharacters: room.gameState.board.data.availableCharacters
		}));
	}
);
