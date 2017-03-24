import {drawHLCardAction, setHLDeckAction} from '../../../common/gameState/hl';
import {shuffle} from '../../utils/shuffle';

export const drawHLCard = () => (
	(dispatch, getState) => {
		const {room} = getState();
		if (room.gameState.hl.deck.length === 0) {
			dispatch(setHLDeckAction(shuffle(room.gameState.hl.discard)));
		}
		dispatch(drawHLCardAction());
	}
);
