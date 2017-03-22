import axios from 'axios';
import {gameStateReducer} from '../../common/gameState';
import {setError} from './boardError';
import {BOARD_STATUSES} from '../../common/gameState/board';
import {changeBoardStatus} from './gameState/board';
import {changeMonsterController} from '../../common/gameState/monsterController';
import {startMonsterTurn} from './gameState/monsterController.js';

//actions
export const ROOM_RESULT = 'ROOM_RESULT';

//reducer
export const room = (state = null, action) => {
	switch (action.type) {
	case ROOM_RESULT:
		return action.roomData;
	default:
		if (state && state.gameState) {
			return Object.assign({}, state, {gameState: gameStateReducer(state.gameState, action)});
		} else {
			return state;
		}
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
			.then((response) => {
				dispatch(result(response.data));
				dispatch(checkGameState());
			})
			.catch((e) => {
				console.error('Error while loading rooms', e);
				dispatch(result(null));
			})
);

export const takeControl = (slot) => (
	(dispatch, getState) => {
		const {room: state} = getState();
		axios.post(`/api/room/${state.id}/takeControl/${slot}`)
			.then(() => {
				dispatch(fetch(state.id));
			})
			.catch((e) => {
				console.error('Error while taking control', e);
			});
	}
);

export const checkGameState = () => (
	(dispatch, getState) => {
		const { room: state, auth: user } = getState();
		if (
			(
				state.gameState.monsterController === undefined ||
				state.gameState.monsterController === null
			) &&
			state.Player1.id === user.id
		) {
			dispatch(changeMonsterController(user.id));
		}


		if (!state.Player1 || !state.Player2 || !state.Player3 || !state.Player4) {
			dispatch(setError('All characters must be controlled'));
			dispatch(changeBoardStatus(BOARD_STATUSES.generic));
		} else {
			dispatch(setError(null));

			if (
				!state.gameState.positions.player1 ||
				!state.gameState.positions.player2 ||
				!state.gameState.positions.player3 ||
				!state.gameState.positions.player4
			) {
				dispatch(changeBoardStatus(BOARD_STATUSES.initialPlacement));
			} else if (
				state.gameState.board.status === BOARD_STATUSES.initialPlacement &&
				state.gameState.monsterController === user.id
			) {
				dispatch(changeBoardStatus(BOARD_STATUSES.generic));
				dispatch(startMonsterTurn());
			}
		}
	}
);
