// actions
const DRAW_HL_CARD = 'DRAW_HL_CARD';

// reducer
const hl = (state = null, action) => {
	switch (action.type) {
	case DRAW_HL_CARD:
		const [next, ...deck] = state.deck;
		const newState = Object.assign({}, state, {
			deck: deck,
			discard: [next, ...state.discard]
		});
		return newState;
	default:
		return state;
	}
};

// action creators
const drawHLCard = () => ({
	type: DRAW_HL_CARD
});

module.exports = {
	hl,
	drawHLCard
};
