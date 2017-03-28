// actions
const DRAW_AI_CARD = 'DRAW_AI_CARD';
const WOUND_AI = 'WOUND_AI';
const SET_AI = 'SET_AI';
const REMOVE_FROM_DISCARD = 'REMOVE_FROM_DISCARD';

// reducer
const ai = (state = null, action) => {
	let next, deck, newState;
	switch (action.type) {
	case DRAW_AI_CARD:
		if (state.deck.length) {
			[next, ...deck] = state.deck;
			newState = Object.assign({}, state, {
				deck: deck,
				discard: [next, ...state.discard]
			});
			return newState;
		} else {
			return state;
		}
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
			discard: []
		});
	case REMOVE_FROM_DISCARD:
		return Object.assign({}, state, {
			discard: state.discard.filter((curCard) => curCard !== action.card)
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
const removeFromDiscard = (card) => ({
	type: REMOVE_FROM_DISCARD,
	card
});

module.exports = {
	ai,
	drawAICardAction,
	woundAIAction,
	setAIDeckAction,
	removeFromDiscard
};
