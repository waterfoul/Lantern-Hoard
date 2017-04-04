//actions
const DAMAGE_ARMOR = 'DAMAGE_ARMOR';

//reducer
const armor = (state = null, action) => {
	switch (action.type) {
		case DAMAGE_ARMOR:
			const result = [...state];
			result[action.player] = Object.assign({}, result[action.player], {
				[action.location]: (result[action.player][action.location] - action.amount)
			});
			return result;
		default:
			return state;
	}
};

//action creators
const damageArmorAction = (player, location, amount) => ({
	type: DAMAGE_ARMOR,
	player,
	location,
	amount
});

module.exports = {
	armor,
	damageArmorAction
};
