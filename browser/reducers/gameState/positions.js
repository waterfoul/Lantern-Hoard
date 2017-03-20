import {moveToken} from '../../../common/gameState/positions';
import {checkGameState} from '../room';

//thunks
export const move = (token, location) => (
	(dispatch) => {
		dispatch(moveToken(token, location));
		dispatch(checkGameState());
	}
);
