// actions
const CHANGE_MONSTER_CONTROLLER = 'CHANGE_MONSTER_CONTROLLER';

// reducer
const monsterController = (state = null, action) => {
	switch (action.type) {
	case CHANGE_MONSTER_CONTROLLER:
		return action.controller;
	default:
		return state;
	}
};

// action creators
const changeMonsterController = (controller) => ({
	type: CHANGE_MONSTER_CONTROLLER,
	controller
});

module.exports = {
	monsterController,
	changeMonsterController
};
