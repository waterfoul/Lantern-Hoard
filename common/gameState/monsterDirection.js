//actions
const CHANGE_MONSTER_DIRECTION = 'CHANGE_MONSTER_DIRECTION';

//reducer
const monsterDirection = (state = 'S', action) => {
	switch (action.type) {
		case CHANGE_MONSTER_DIRECTION:
			return action.direction;
		default:
			return state;
	}
};

//action creators
const changeMonsterDirection = (direction) => ({
	type: CHANGE_MONSTER_DIRECTION,
	direction
});

module.exports = {
	monsterDirection,
	changeMonsterDirection
};
