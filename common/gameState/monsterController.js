//actions
const CHANGE_MONSTER_CONTROLLER = 'CHANGE_MONSTER_CONTROLLER';

//reducer
const monsterController = (state = null, action) => {
	switch (action.type) {
	case CHANGE_MONSTER_CONTROLLER:
		return {
			status: action.status,
			data: action.data
		};
	default:
		return state;
	}
};

//action creators
const changeMonsterController = (userId) => ({
	type: CHANGE_MONSTER_CONTROLLER,
	userId
});

module.exports = {
	monsterController,
	changeMonsterController
};
