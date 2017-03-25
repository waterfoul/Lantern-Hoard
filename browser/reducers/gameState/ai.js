import {drawAICardAction, woundAIAction, setAIDeckAction} from '../../../common/gameState/ai';
import {shuffle} from '../../utils/shuffle';
import {BOARD_STATUSES, changeBoardStatusAction} from '../../../common/gameState/board';

export const drawAICard = () => (
	(dispatch, getState) => {
		const {room} = getState();
		if (room.gameState.ai.deck.length === 0) {
			if (room.gameState.ai.discard.length !== 0) {
				dispatch(setAIDeckAction(shuffle(room.gameState.ai.discard)));
			}
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
		if (room.gameState.ai.deck.length === 0 && room.gameState.ai.discard.length === 0){
			dispatch(changeBoardStatusAction(BOARD_STATUSES.victory));
		} else {
			dispatch(woundAIAction());
		}
	}
);
