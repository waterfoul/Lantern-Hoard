const EFFECT_TYPES = {
	persistantInjury: 'PERSISTANT_INJURY'
};

//actions
const ADD_PERSISTANT_INJURY = 'ADD_PERSISTANT_INJURY';

//reducer
const effects = (state = [], action) => {
	switch (action.type) {
	case ADD_PERSISTANT_INJURY:
		return [Object.assign({
			type: EFFECT_TYPES.persistantInjury,
			name: action.name,
			image: action.image
		}, action.other), ...state];
	default:
		return state;
	}
};

//action creators
const addPersistantInjury = (name, image, other = {}) => ({
	type: ADD_PERSISTANT_INJURY,
	name,
	image,
	other
});

module.exports = {
	effects,
	addPersistantInjury
};
