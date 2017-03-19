import axios from 'axios';

export const BOARD_STATUSES = {
	generic: 'GENERIC', // Used to show the board without overlays
	initialPlacement: 'INITIAL_PLACEMENT', // Used to allow for initial character placement,
	rollingToHit: 'ROLLING_TO_HIT'
};

//actions
const CHANGE_BOARD_STATUS = 'CHANGE_BOARD_STATUS';

const initialState = {
	status: BOARD_STATUSES.generic,
	data: {}
};

//reducer
export const board = (state = initialState, action) => {
	switch (action.type) {
	case CHANGE_BOARD_STATUS:
		return {
			status: action.status,
			data: action.data
		};
	default:
		return state;
	}
};

//action creators
export const changeBoardStatusAction = (status, data) => ({
	type: CHANGE_BOARD_STATUS,
	status,
	data
});

//thunks
export const changeBoardStatus = (status, data) => (
	(dispatch, getState) => {
		const {room} = getState();

		if (
			!room.gameState.board ||
			room.gameState.board.status !== status ||
			room.gameState.board.data !== data
		) {
			dispatch(changeBoardStatusAction(status, data));
		}
	}
);
