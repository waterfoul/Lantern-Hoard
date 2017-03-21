const {combineReducers} = require('redux');

const {board} = require('./board');
const {positions} = require('./positions');
const { monsterController } = require('./monsterController');


const noop = (state) => (state || null);

const gameStateReducer = combineReducers({
	board,
	hl: noop,
	ai: noop,
	effects: noop,
	monsterName: noop,
	monsterStats: noop,
	monsterDirection: () => 'S', //Adding a stub here, TODO: replace this with a reducer
	positions,
	gear: noop,
	armor: noop,
	monsterController,
	threats: () => [true, true, true, true] //Adding a stub here, TODO: replace this with a reducer
});

module.exports = {
	gameStateReducer
};
