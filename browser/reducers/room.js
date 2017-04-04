import axios from 'axios';
import { gameStateReducer } from '../../common/gameState';
import { setError } from './boardError';
import { BOARD_STATUSES } from '../../common/gameState/board';
import { changeBoardStatus } from './gameState/board';
import { changeMonsterController } from '../../common/gameState/monsterController';
import { startMonsterTurn } from './gameState/monsterController';
import { promptForCharacters } from './gameState/playerTurn';
import { send } from '../socket';

//actions
export const ROOM_RESULT = 'ROOM_RESULT';

//reducer
export const room = (state = null, action) => {
	switch (action.type) {
		case ROOM_RESULT:
			if (state && !action.forceGameState && action.roomData.id === state.id) {
				return Object.assign({}, action.roomData, {
					gameState: state.gameState
				});
			} else {
				return action.roomData;
			}
		default:
			if (state && state.gameState) {
				return Object.assign({}, state, { gameState: gameStateReducer(state.gameState, action) });
			} else {
				return state;
			}
	}
};

//action creators
export const result = (roomData, forceGameState) => ({
	type: ROOM_RESULT,
	roomData,
	forceGameState
});

//thunks
export const fetch = (id, forceGameState = false) => (
	(dispatch) =>
		axios.get(`/api/room/${id}`)
			.then((response) => {
				dispatch(result(response.data, forceGameState));
				dispatch(checkGameState());
				send('connect');
			})
			.catch((e) => {
				console.error('Error while loading rooms', e);
				dispatch(result(null));
			})
);

export const takeControl = (slot) => (
	(dispatch, getState) => {
		const { room: state } = getState();
		axios.post(`/api/room/${state.id}/takeControl/${slot}`)
			.then(() => {
				dispatch(fetch(state.id));
			})
			.catch((e) => {
				console.error('Error while taking control', e);
			});
	}
);

const checkMonsterController = () => (dispatch, getState) => {
	const { room: { gameState: { monsterController }, Player1 }, auth: user } = getState();
	if (
		(
			monsterController === undefined ||
			monsterController === null
		) &&
		Player1.id === user.id
	) {
		dispatch(changeMonsterController(user.id));
	}
};

const checkCharacterPositions = () => (dispatch, getState) => {
	const { room: state, auth: user } = getState();
	const { gameState: { positions, board, monsterController } } = state;

	if (
		!positions.player1 ||
		!positions.player2 ||
		!positions.player3 ||
		!positions.player4
	) {
		dispatch(changeBoardStatus(BOARD_STATUSES.initialPlacement));
	} else if (
		board.status === BOARD_STATUSES.initialPlacement &&
		monsterController === user.id
	) {
		dispatch(changeBoardStatus(BOARD_STATUSES.generic));
		dispatch(startMonsterTurn());
	}

	if (
		board.status === BOARD_STATUSES.playerTurn &&
		state[`Character${board.data.character + 1}`].dead
	) {
		// The player who's turn it is has died, re-select a char
		promptForCharacters(board.data.availableCharacters);
	}
};

export const checkGameState = () => (
	(dispatch, getState) => {
		const { room: { Player1, Player2, Player3, Player4, gameState: { board } } } = getState();
		dispatch(checkMonsterController());

		if (!Player1 || !Player2 || !Player3 || !Player4) {
			dispatch(setError('All characters must be controlled'));
			dispatch(changeBoardStatus(BOARD_STATUSES.generic));
		} else {
			dispatch(setError(null));

			dispatch(checkCharacterPositions());

			if (board.status === BOARD_STATUSES.selectActingCharacter) {
				// We're waiting for a selection, re-start the selection just in case
				promptForCharacters(board.data);
			}
		}
	}
);
