import axios from 'axios';

//actions
export const ROOM_RESULT = 'ROOM_RESULT';

//reducer
export const room = (state = null, action) => {
	switch (action.type) {
	case ROOM_RESULT:
		return action.roomData;
	default:
		return state;
	}
};

//action creators
export const result = (roomData) => ({
	type: ROOM_RESULT,
	roomData
});

//thunks
export const fetch = (id) => (
	(dispatch) =>
		axios.get(`/api/room/${id}`)
			.then((response) => dispatch(result(response.data)))
			.catch((e) => {
				console.error('Error while loading rooms', e);
				dispatch(result(null));
			})
);
