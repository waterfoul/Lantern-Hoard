import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import {reducers} from './reducers';
import thunkMiddleware from 'redux-thunk';

import {changeFixState, CHANGE_FIX_STATE} from './reducers/flexBoxFix';
import {ROOM_RESULT} from './reducers/room';
import {send} from './socket';

let timeout = -1;
// This middleware triggers chrome to fix the flexbox any time the store changes to keep ui bugs from happening
const flexboxFixMiddleware = (store) => (next) => (action) => {
	if (action.type !== CHANGE_FIX_STATE) {
		clearTimeout(timeout);
		timeout = setTimeout(() => store.dispatch(changeFixState()), 100);
	}
	return next(action);
};

const socketMiddleware = (store) => (next) => (action) => {
	const {room} = store.getState();

	const nextAction = next(action);

	const {room: roomAfter} = store.getState();

	if (room && roomAfter && room.gameState !== roomAfter.gameState && !action.fromSocket && action.type !== ROOM_RESULT) {
		send(action);
	}

	return nextAction;
};

const statusListeners = {};
// This allows things to listen for certain board statuses to happen
export function listenForBoardStatus(status, thunk) {
	statusListeners[status] = statusListeners[status] || [];
	statusListeners[status].push(thunk);
}

export const store = createStore(
	reducers,
	composeWithDevTools(
		applyMiddleware(
			thunkMiddleware,
			flexboxFixMiddleware,
			socketMiddleware
		)
	)
);

let oldBoard = {};

store.subscribe(() => {
	const { room } = store.getState();
	const newBoard = room.gameState.board;
	if (oldBoard.status !== newBoard.status || oldBoard.data !== newBoard.data) {
		oldBoard = newBoard;
		if (statusListeners[newBoard.status]) {
			statusListeners[newBoard.status].forEach((thunk) => store.dispatch(thunk(newBoard)));
		}
	}
});
