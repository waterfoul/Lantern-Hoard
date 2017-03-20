import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import {reducers} from './reducers';
import thunkMiddleware from 'redux-thunk';

import {changeFixState, CHANGE_FIX_STATE} from './reducers/flexBoxFix';
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

	if (room && roomAfter && room.gameState !== roomAfter.gameState && !action.fromSocket) {
		send(action);
	}

	return nextAction;
};

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

