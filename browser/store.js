import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import {reducers} from './reducers';
import thunkMiddleware from 'redux-thunk';

import {changeFixState, CHANGE_FIX_STATE} from './reducers/flexBoxFix';
import {ROOM_RESULT} from './reducers/room';
import {AUTHENTICATED} from './reducers/auth';
import {ROOM_LIST} from './reducers/roomList';
import {init} from './listenForBoardStatus';
import {send} from './socket';

let timeout = -1;
// This middleware triggers chrome to fix the flexbox any time the store changes to keep ui bugs from happening
const flexboxFixMiddleware = (store) => (next) => (action) => {
	if (!action) {
		throw new Error('Null action passed to store!');
	}
	if (action.type !== CHANGE_FIX_STATE) {
		clearTimeout(timeout);
		timeout = setTimeout(() => store.dispatch(changeFixState()), 100);
	}
	return next(action);
};

const socketExclude = [
	ROOM_RESULT,
	CHANGE_FIX_STATE,
	AUTHENTICATED,
	ROOM_LIST
];
const socketMiddleware = () => (next) => (action) => {
	const nextAction = next(action);

	if (!action.fromSocket && socketExclude.indexOf(action.type) === -1) {
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

init(store);
