import axios from 'axios';

//actions
export const LIST_RESULT = 'LIST_RESULT';

//reducer
export const roomList = (state = null, action) => {
	switch (action.type) {
	case LIST_RESULT:
		return action.list;
	default:
		return state;
	}
};

//action creators
export const listResult = (list) => ({
	type: LIST_RESULT,
	list
});

//thunks
export const fetchList = () => (
	(dispatch) =>
		axios.get('/api/room')
			.then((response) => dispatch(listResult(response.data)))
			.catch((e) => {
				console.error('Error while loading rooms', e);
				dispatch(listResult(null));
			})
);

export const join = (roomId) => (
	(dispatch) =>
		axios.post(`/api/room/${roomId}/join`)
			.then(() => dispatch(fetchList()))
			.catch((e) => {
				console.error('Error while joining room', e);
				dispatch(fetchList());
			})
);
