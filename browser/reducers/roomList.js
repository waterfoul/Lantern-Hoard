import axios from 'axios';

//actions
export const ROOM_LIST = 'ROOM_LIST';

//reducer
export const roomList = (state = null, action) => {
	switch (action.type) {
		case ROOM_LIST:
			return action.list;
		default:
			return state;
	}
};

//action creators
export const listResult = (list) => ({
	type: ROOM_LIST,
	list
});

//thunks
export const fetchList = () => (
	(dispatch) =>
		axios.get('/api/room')
			.then((response) => dispatch(listResult(response.data)))
			.catch((e) => {
				// TODO: Display an error on the UI
				// eslint-disable-next-line no-console
				console.error('Error while loading rooms', e);
				dispatch(listResult(null));
			})
);

export const join = (roomId) => (
	(dispatch) =>
		axios.post(`/api/room/${roomId}/join`)
			.then(() => dispatch(fetchList()))
			.catch((e) => {
				// TODO: Display an error on the UI
				// eslint-disable-next-line no-console
				console.error('Error while joining room', e);
				dispatch(fetchList());
			})
);

export const create = (room) => (
	(dispatch) =>
		axios.post('/api/room', room)
			.then(() => dispatch(fetchList()))
			.catch((e) => {
				// TODO: Display an error on the UI
				// eslint-disable-next-line no-console
				console.error('Error while creating room', e);
				dispatch(fetchList());
			})
);
