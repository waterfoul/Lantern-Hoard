// actions
const DRAW_AI_CARD = 'DRAW_AI_CARD';

// reducer
const ai = (state = null, action) => {
	switch (action.type) {
	case DRAW_AI_CARD:
		const newState = Object.assign({}, state, {
			deck: [...state.deck],
			discard: [state.deck[0], ...state.discard]
		});
		newState.deck.shift();
		return newState;
	default:
		return state;
	}
};

// action creators
const drawAICard = () => ({
	type: DRAW_AI_CARD
});

module.exports = {
	ai,
	drawAICard
};
