const EFFECT_TYPES = {
	persistantInjury: 'PERSISTANT_INJURY',
	addMood: 'ADD_MOOD'
};

//actions
const ADD_PERSISTANT_INJURY = 'ADD_PERSISTANT_INJURY';
const ADD_MOOD = 'ADD_MOOD';

//reducer
const effects = (state = [], action) => {
	switch (action.type) {
	case ADD_PERSISTANT_INJURY:
		return [Object.assign({
			type: EFFECT_TYPES.persistantInjury,
			name: action.name,
			image: action.image
		}, action.other), ...state];
	case ADD_MOOD:
		return [{
			type: EFFECT_TYPES.addMood,
			triggers: action.triggers,
			image: action.image
		}];
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

const addMood = (image, triggers) => ({
	type: ADD_MOOD,
	image,
	triggers

});

module.exports = {
	effects,
	addPersistantInjury,
	addMood
};
