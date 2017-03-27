// actions
const DRAW_HL_CARD = 'DRAW_HL_CARD';
const SET_HL = 'SET_HL';
const REMOVE_FROM_DISCARD = 'REMOVE_FROM_DISCARD';

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
	case SET_HL:
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
const drawHLCardAction = () => ({
	type: DRAW_HL_CARD
});
const setHLDeckAction = (deck) => ({
	type: SET_HL,
	deck
});
const removeFromDiscard = (card) => ({
	type: REMOVE_FROM_DISCARD,
	card
});

module.exports = {
	hl,
	drawHLCardAction,
	setHLDeckAction,
	removeFromDiscard
};
