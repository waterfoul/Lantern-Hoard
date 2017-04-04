//actions
const ADJUST_MONSTER_STATS = 'ADJUST_MONSTER_STATS';

//reducer
const monsterStats = (state = {}, action) => {
	switch (action.type) {
		case ADJUST_MONSTER_STATS: {
			const newState = Object.assign({}, state);
			for (let i in action.statAdjustments) {
				newState[i] += action.statAdjustments[i];
			}
			return newState;
		}
		default:
			return state;
	}
};

//action creators
const adjustMonsterStats = (statAdjustments) => ({
	type: ADJUST_MONSTER_STATS,
	statAdjustments
});

module.exports = {
	monsterStats,
	adjustMonsterStats
};
