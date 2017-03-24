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
	// changed getState to gamestate and board.gameState to gameState.
	(gameState, dispatch) => {
		// let {board} = getState();
		if (gameState.ai.deck.length === 0) {
			dispatch(setAIDeckAction(shuffle(gameState.ai.discard)));
		}
		dispatch(woundAIAction());
	}
);
