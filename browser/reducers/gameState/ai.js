import {drawAICardAction, woundAIAction, setAIDeckAction} from '../../../common/gameState/ai';
import {shuffle} from '../../utils/shuffle';

export const drawAICard = () => (
	(dispatch, getState) => {
		const {room} = getState();
		if (room.gameState.ai.deck.length === 0) {
			dispatch(setAIDeckAction(shuffle(room.gameState.ai.discard)));
		}
		dispatch(drawAICardAction());
	}
);
export const woundAI = () => (
	(dispatch, getState) => {
		let {room} = getState();
		if (room.gameState.ai.deck.length === 0) {
			dispatch(setAIDeckAction(shuffle(room.gameState.ai.discard)));
		}
		dispatch(woundAIAction());
	}
);
