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
		location = [
			Math.max(Math.min(location[0], 20), 1),
			Math.max(Math.min(location[1], 14), 1)
		];
		// TODO: Knock over any players that the monster would run over
		// TODO: Squish players out
		dispatch(moveToken('monster', location));
	}
);
