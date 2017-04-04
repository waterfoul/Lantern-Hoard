import { changeBoardStatusAction, BOARD_STATUSES } from '../../../common/gameState/board';
import { damageArmor } from './armor';
import { getEvasion } from '../../utils/getStats';

//thunks
export const changeBoardStatus = (status, data) => (
	(dispatch, getState) => {
		const { room } = getState();

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
		const { room } = getState();
		const data = Object.assign({}, room.gameState.board.data);
		const target = room['Character' + (data.target + 1)];
		const evasion = getEvasion(target, room.gameState, data.target);
		const monsterAccuracy = room.gameState.monsterStats.accuracy;

		data.rolls = [];
		data.hits = [];

		for (let i = 0; i < data.speed; i++) {
			const val = Math.floor(Math.random() * 10) + 1;
			data.rolls.push(val);
			if (val !== 1 && (val === 10 || val >= (data.accuracy + evasion - monsterAccuracy))) {
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
		const { room } = getState();
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
		const { room } = getState();
		const data = room.gameState.board.data;
		dispatch(damageArmor(data.target, (data.wounds || []).map((roll) => locations[roll]), data.damage, data.nextStatus));
	}
);
