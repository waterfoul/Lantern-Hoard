import {changeBoardStatusAction, BOARD_STATUSES} from '../../common/gameState/board';
import {listenForBoardStatus} from '../listenForBoardStatus';
import {monsters} from '../data/monsters';

export const triggerEffectThunks = (trigger, nextState) => (dispatch, getState) => {
	const {room: {gameState: {effects}}} = getState();
	const triggers = effects.reduce((res, ele) => {
		ele.triggers.forEach((trg) => {
			if (trg.trigger === trigger) {
				res.push(trg);
			}
		});
		return res;
	}, []);

	dispatch(triggerEffectAction({data: {triggers, nextState}}));
};

const triggerEffectAction = ({data: {triggers, nextState}}) => (dispatch, getState) => {
	if (triggers.length) {
		const {room: {gameState}} = getState();
		const [current, newTriggers] = triggers;
		let cardList = monsters[gameState.monsterName][current.type];

		if (current.type === 'ai') {
			cardList = cardList.cards;
		}

		const thunk = cardList[current.card].triggers[current.thunk];
		dispatch(thunk([BOARD_STATUSES.nextTrigger, {triggers: newTriggers || [], nextState}]));
	} else {
		dispatch(changeBoardStatusAction.apply(null, nextState));
	}
};

listenForBoardStatus(BOARD_STATUSES.nextTrigger, triggerEffectAction);
