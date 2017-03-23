const {combineReducers} = require('redux');

const {board} = require('./board');
const {positions} = require('./positions');
const { monsterController } = require('./monsterController');
const { armor } = require('./armor');
const { ai } = require('./ai');
const { knockedDownCharacters } = require('./knockedDownCharacters');
const { playerResources } = require('./playerResources');

const noop = (state) => (state || null);

const gameStateReducer = combineReducers({
	board,
	hl: noop,
	ai,
	effects: noop,
	monsterName: noop,
	monsterStats: noop,
	monsterDirection: () => 'S', //Adding a stub here, TODO: replace this with a reducer
	positions,
	gear: noop,
	armor,
	monsterController,
	playerResources,
	knockedDownCharacters,
	threats: () => [true, true, true, true] //Adding a stub here, TODO: replace this with a reducer
});

module.exports = {
	gameStateReducer
};
