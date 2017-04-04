import { combineReducers } from 'redux';

import { auth } from './auth';
import { roomList } from './roomList';
import { room } from './room';
import { flexBoxFix } from './flexBoxFix';
import { boardError } from './boardError';

export const reducers = combineReducers({
	auth,
	room,
	roomList,
	flexBoxFix,
	boardError
});
