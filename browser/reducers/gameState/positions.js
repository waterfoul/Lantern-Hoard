import {checkGameState} from '../room';

//actions
const MOVE_TOKEN = 'MOVE_TOKEN';

//reducer
export const positions = (state = {}, action) => {
	switch (action.type) {
	case MOVE_TOKEN:
		return Object.assign({}, state, {
			[action.token]: action.location
		});
	default:
		return state;
	}
};

//action creators
export const moveToken = (token, location) => ({
	type: MOVE_TOKEN,
	token,
	location
});

//thunks
export const move = (token, location) => (
	(dispatch) => {
		dispatch(moveToken(token, location));
		dispatch(checkGameState());
	}
);
