//actions
export const SET_BOARD_ERROR = 'SET_BOARD_ERROR';

//reducer
export const boardError = (state = null, action) => {
	switch (action.type) {
		case SET_BOARD_ERROR:
			return action.message;
		default:
			return state;
	}
};

//action creators
export const setErrorAction = (message) => ({
	type: SET_BOARD_ERROR,
	message
});

//thunks
export const setError = (message) => (
	(dispatch, getState) => {
		const { boardError: state } = getState();

		if (state !== message) {
			dispatch(setErrorAction(message));
		}
	}
);
