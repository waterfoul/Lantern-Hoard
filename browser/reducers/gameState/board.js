import {changeBoardStatusAction, BOARD_STATUSES} from '../../../common/gameState/board';
import {damageArmor} from './armor';

//thunks
export const changeBoardStatus = (status, data) => (
	(dispatch, getState) => {
		const {room} = getState();

		if (
			!room.gameState.board ||
			room.gameState.board.status !== status ||
			room.gameState.board.data !== data
		) {
			dispatch(changeBoardStatusAction(status, data));
		}
	}
);

export const rollForMonsterHits = () => (
	(dispatch, getState) => {
		const {room} = getState();
		const data = Object.assign({}, room.gameState.board.data);
		data.rolls = [];
		data.hits = [];
		for (let i = 0; i < data.speed; i++) {
			const val = Math.floor(Math.random() * 10) + 1;
			data.rolls.push(val);
			if (val >= (data.accuracy + 0 /* TODO: Evasion */)) {
				data.hits.push(true);
			} else {
				data.hits.push(false);
			}
		}
		dispatch(changeBoardStatus(room.gameState.board.status, data));
	}
);

export const rollForMonsterWounds = () => (
	(dispatch, getState) => {
		const {room} = getState();
		const data = Object.assign({}, room.gameState.board.data);
		data.wounds = data.hits.map((v) => v ? Math.floor(Math.random() * 6) + 1 : null);
		dispatch(changeBoardStatus(BOARD_STATUSES.playerDamage, data));
	}
);

const locations = [
	'',
	'body',
	'head',
	'waist',
	'hand',
	'foot',
	'body'
];
export const applyDamage = () => (
	(dispatch, getState) => {
		const {room} = getState();
		const data = room.gameState.board.data;
		data.wounds.forEach((roll) => {
			dispatch(damageArmor(data.target, locations[roll], data.damage));
		});
		dispatch(changeBoardStatus(BOARD_STATUSES.playerDamageFinished));
	}
);
