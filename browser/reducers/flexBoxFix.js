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
export const startTriggers = () => (
	(dispatch) => {
		// Initial change to make sure everything renders correctly
		setTimeout(() => dispatch(changeFixState()), 10);
		setTimeout(() => dispatch(changeFixState()), 100);
		setTimeout(() => dispatch(changeFixState()), 1000);

		let timeout = -1;
		window.addEventListener('resize', () => {
			clearTimeout(timeout);
			timeout = setTimeout(() => dispatch(changeFixState()), 10);
		});
	}
);
