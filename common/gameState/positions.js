//actions
const MOVE_TOKEN = 'MOVE_TOKEN';

//reducer
const positions = (state = {}, action) => {
	switch (action.type) {
		case MOVE_TOKEN:
			return Object.assign({}, state, {
				[action.token]: action.location
			});
		default:
			return state;
	}
};

//action creators
const moveToken = (token, location) => ({
	type: MOVE_TOKEN,
	token,
	location
});

module.exports = {
	positions,
	moveToken
};
