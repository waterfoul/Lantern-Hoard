// actions
const DRAW_AI_CARD = 'DRAW_AI_CARD';

// reducer
const ai = (state = null, action) => {
	switch (action.type) {
	case DRAW_AI_CARD:
		let nextCard = state.deck.shift();
		state.discard.unshift(nextCard);
		break;
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
