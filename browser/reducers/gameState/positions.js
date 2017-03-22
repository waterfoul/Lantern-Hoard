import {moveToken} from '../../../common/gameState/positions';
import {checkGameState} from '../room';

//thunks
export const move = (token, location) => (
	(dispatch) => {
		dispatch(moveToken(token, location));
		dispatch(checkGameState());
	}
);
export const moveMonster = (location) => (
	(dispatch) => {
		// TODO: Knock over any players that the monster would run over
		dispatch(moveToken('monster', location));
	}
);
