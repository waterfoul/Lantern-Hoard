import { combineReducers } from 'redux';

import {board} from './board';
import {positions} from './positions';

const noop = (state) => (state || null);

export const gameStateReducer = combineReducers({
	board,
	hl: noop,
	ai: noop,
	effects: noop,
	monsterName: noop,
	monsterStats: noop,
	positions,
	gear: noop,
	armor: noop
});
