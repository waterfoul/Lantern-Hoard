import { combineReducers } from 'redux';

import {auth} from './auth';
import {roomList} from './roomList';
import {room} from './room';
import {flexBoxFix} from './flexBoxFix';

export const reducers = combineReducers({
	auth,
	room,
	roomList,
	flexBoxFix
});
