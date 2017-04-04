import axios from 'axios';

//actions
export const AUTHENTICATED = 'AUTHENTICATED';

//reducer
export const auth = (state = null, action) => {
	switch (action.type) {
		case AUTHENTICATED:
			return action.user;
		default:
			return state;
	}
};

//action creators
export const authenticated = (user) => ({
	type: AUTHENTICATED, user
});

//thunks
export const whoami = () => (
	(dispatch) =>
		axios.get('/api/auth/whoami')
			.then((response) => dispatch(authenticated(response.data)))
			.catch((e) => {
				// UI won't really display this error, the user will just get logged out
				// eslint-disable-next-line no-console
				console.error('Error while logging in', e);
				dispatch(authenticated(null));
			})
);

export const logout = () => (
	(dispatch) =>
		axios.post('/api/auth/logout')
			.then(() => dispatch(whoami()))
			.catch(() => dispatch(whoami()))
);
