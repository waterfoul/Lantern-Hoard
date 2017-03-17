import { combineReducers } from 'redux';

import {auth} from './auth';
import {roomList} from './roomList';

export const reducers = combineReducers({
	auth,
	roomList
});
