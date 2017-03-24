// actions
const DRAW_AI_CARD = 'DRAW_AI_CARD';
const WOUND_AI = 'WOUND_AI';
const SET_AI = 'SET_AI';

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
	case SET_AI:
		return Object.assign({}, state, {
			deck: action.deck,
			wound: []
		});
	default:
		return state;
	}
};

// action creators
const drawAICardAction = () => ({
	type: DRAW_AI_CARD
});
const woundAIAction = () => ({
	type: WOUND_AI
});
const setAIDeckAction = (deck) => ({
	type: SET_AI,
	deck
});

module.exports = {
	ai,
	drawAICardAction,
	woundAIAction,
	setAIDeckAction
};
