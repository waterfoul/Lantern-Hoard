const {combineReducers} = require('redux');

const {board} = require('./board');
const {positions} = require('./positions');
const { monsterController } = require('./monsterController');
const { armor } = require('./armor');
const { ai } = require('./ai');
const { hl } = require('./hl');
const { knockedDownCharacters } = require('./knockedDownCharacters');
const { playerResources } = require('./playerResources');
const { monsterDirection } = require('./monsterDirection');
const { woundOrder } = require('./woundOrder');

const noop = (state) => (state || null);

const gameStateReducer = combineReducers({
	board,
	hl,
	ai,
	effects: noop,
	monsterName: noop,
	monsterStats: noop,
	monsterDirection,
	positions,
	gear: noop,
	armor,
	monsterController,
	woundOrder,
	playerResources,
	knockedDownCharacters,
	threats: () => [true, true, true, true] //Adding a stub here, TODO: replace this with a reducer
});

module.exports = {
	gameStateReducer
};
