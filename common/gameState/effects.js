const EFFECT_TYPES = {
	persistentInjury: 'PERSISTENT_INJURY',
	addMood: 'ADD_MOOD'
};

//actions
const ADD_PERSISTENT_INJURY = 'ADD_PERSISTENT_INJURY';
const ADD_MOOD = 'ADD_MOOD';

//reducer
const effects = (state = [], action) => {
	switch (action.type) {
	case ADD_PERSISTENT_INJURY:
		return [Object.assign({
			type: EFFECT_TYPES.persistentInjury,
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
const addPersistentInjury = (name, image, other = {}) => ({
	type: ADD_PERSISTENT_INJURY,
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
	addPersistentInjury,
	addMood
};
