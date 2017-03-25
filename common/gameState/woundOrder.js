//actions
const PLAYER_HAS_WOUNDED = 'PLAYER_HAS_WOUNDED';

//reducer
const woundOrder = (state = [], action) => {
	switch (action.type) {
	case PLAYER_HAS_WOUNDED:
		return [
			action.player,
			...state.filter((id) => id !== action.player)
		];
	default:
		return state;
	}
};

//action creators
const playerHasWounded = (player) => ({
	type: PLAYER_HAS_WOUNDED,
	player
});

module.exports = {
	woundOrder,
	playerHasWounded
};
