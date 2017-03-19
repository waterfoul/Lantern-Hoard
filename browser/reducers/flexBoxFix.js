import axios from 'axios';

//actions
export const CHANGE_FIX_STATE = 'CHANGE_FIX_STATE';

//reducer
export const flexBoxFix = (state = true, action) => {
	switch (action.type) {
	case CHANGE_FIX_STATE:
		return !state;
	default:
		return state;
	}
};

//action creators
export const changeFixState = () => ({
	type: CHANGE_FIX_STATE
});

//thunks
export const startTrigger = () => (
	(dispatch) => {
		let timeout = -1;
		window.addEventListener('resize', () => {
			clearTimeout(timeout);
			timeout = setTimeout(() => dispatch(changeFixState()), 10);
		});
	}
);
