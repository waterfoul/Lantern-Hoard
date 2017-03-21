const {combineReducers} = require('redux');

const {board} = require('./board');
const {positions} = require('./positions');
const { monsterController } = require('./positions');


const noop = (state) => (state || null);

const gameStateReducer = combineReducers({
	board,
	hl: noop,
	ai: noop,
	effects: noop,
	monsterName: noop,
	monsterStats: noop,
	positions,
	gear: noop,
	armor: noop,
	monsterController
});

module.exports = {
	gameStateReducer
};
