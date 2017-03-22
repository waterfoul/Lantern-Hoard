//actions
const CHANGE_PLAYER_RESOURCES = 'CHANGE_PLAYER_RESOURCES';
const USE_PLAYER_RESOURCE_MOVEMENT = 'USE_PLAYER_RESOURCE_MOVEMENT';
const USE_PLAYER_RESOURCE_ACTION = 'USE_PLAYER_RESOURCE_ACTION';

//reducer
const positions = (state = {}, action) => {
	switch (action.type) {
	case CHANGE_PLAYER_RESOURCES:
		return {
			movements: action.movements,
			actions: action.actions
		};
	case USE_PLAYER_RESOURCE_MOVEMENT:
		return {
			movements: state.movements - 1,
			actions: state.actions
		};
	case USE_PLAYER_RESOURCE_ACTION:
		return {
			movements: state.movements,
			actions: state.actions - 1
		};
	default:
		return state;
	}
};

//action creators
const changePlayerResources = (movements, actions) => ({
	type: CHANGE_PLAYER_RESOURCES,
	movements,
	actions,
});

const useMovement = () => ({
	type: USE_PLAYER_RESOURCE_MOVEMENT
});

const useAction = () => ({
	type: USE_PLAYER_RESOURCE_ACTION
});

module.exports = {
	positions,
	changePlayerResources,
	useMovement,
	useAction
};
