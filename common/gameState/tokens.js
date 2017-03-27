const TOKEN_TYPES = {
	bleeding: 'BLEEDING'
	// TODO: Add other token types
};
// actions
const ADD_TOKEN_TO_CHARACTER = 'ADD_TOKEN_TO_CHARACTER';

// reducers
const tokens = (state = [[], [], [], []], action) => {
	switch (action.type) {
	case ADD_TOKEN_TO_CHARACTER:
		const newState = [...state];
		newState[action.character] = [...newState[action.character], {
			tokenType: action.tokenType,
			negative: action.negative
		}];
		return newState;
	default:
		return state;
	}
};

// action creators
const addTokenToCharacter = (character, tokenType, negative = false) => ({
	type: ADD_TOKEN_TO_CHARACTER,
	character,
	tokenType,
	negative
});

module.exports = {
	tokens,
	addTokenToCharacter,
	TOKEN_TYPES
};
