const BOARD_STATUSES = {
	generic: 'GENERIC', // Used to show the board without overlays
	initialPlacement: 'INITIAL_PLACEMENT', // Used to allow for initial character placement,
	targetChoice: 'TARGET_CHOICE', // Used to allow the monster controller to choose a target
	targetChosen: 'TARGET_CHOSEN', // Used to indicate that a target has been chosen
	playerDamage: 'PLAYER_DAMAGE', // Used to show the dialog for player damage
	playerDamageFinishe: 'PLAYER_DAMAGE_FINISH', // Triggers the finish of the player damage
	rollingToHit: 'ROLLING_TO_HIT',
	selectActingCharacter: 'SELECT_ACTING_CHARACTER',
	actingCharacterChosen: 'ACTING_CHARACTER_CHOSEN'
};

//actions
const CHANGE_BOARD_STATUS = 'CHANGE_BOARD_STATUS';

const initialState = {
	status: BOARD_STATUSES.generic,
	data: {}
};

//reducer
const board = (state = initialState, action) => {
	switch (action.type) {
	case CHANGE_BOARD_STATUS:
		return {
			status: action.status,
			data: action.data
		};
	default:
		return state;
	}
};

//action creators
const changeBoardStatusAction = (status, data) => ({
	type: CHANGE_BOARD_STATUS,
	status,
	data
});

module.exports = {
	BOARD_STATUSES,
	board,
	changeBoardStatusAction
};
