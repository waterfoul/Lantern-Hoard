// actions
const DRAW_AI_CARD = 'DRAW_AI_CARD';
const WOUND_AI = 'WOUND_AI';

// reducer
const ai = (state = null, action) => {
	let next, deck, newState;
	switch (action.type) {
	case DRAW_AI_CARD:
		[next, ...deck] = state.deck;
		newState = Object.assign({}, state, {
			deck: deck,
			discard: [next, ...state.discard]
		});
		return newState;
	case WOUND_AI:
		[next, ...deck] = state.deck;
		newState = Object.assign({}, state, {
			deck: deck,
			wound: [next, ...state.wound]
		});
		return newState;
	default:
		return state;
	}
};

// action creators
const drawAICard = () => ({
	type: DRAW_AI_CARD
});
const woundAI = () => ({
	type: WOUND_AI
});

module.exports = {
	ai,
	drawAICard,
	woundAI
};
