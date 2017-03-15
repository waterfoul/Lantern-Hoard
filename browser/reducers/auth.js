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
			.then((response) => {
				const user = response.data;
				dispatch(authenticated(user));
			})
			.catch(() => dispatch(authenticated(null)))
);

export const logout = () => (
	(dispatch) =>
		axios.post('/api/auth/logout')
			.then(() => dispatch(whoami()))
			.catch(() => dispatch(whoami()))
);
