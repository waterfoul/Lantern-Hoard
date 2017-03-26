const BOARD_STATUSES = {
	generic: 'GENERIC', // Used to show the board without overlays
	initialPlacement: 'INITIAL_PLACEMENT', // Used to allow for initial character placement,
	targetChoice: 'TARGET_CHOICE', // Used to allow the monster controller to choose a target
	targetChosen: 'TARGET_CHOSEN', // Used to indicate that a target has been chosen
	playerDamage: 'PLAYER_DAMAGE', // Used to show the dialog for player damage
	playerDamageFinish: 'PLAYER_DAMAGE_FINISH', // Triggers the finish of the player damage
	selectActingCharacter: 'SELECT_ACTING_CHARACTER', // Prompts the players to select a character to act
	actingCharacterChosen: 'ACTING_CHARACTER_CHOSEN', // Begins the chosen character's turn
	showAvailableMovement: 'SHOW_AVAILABLE_MOVEMENT', // Displays possible character movement on the board
	moveCharacter: 'MOVE_CHARACTER', // Positions the character on the chosen square
	playerTurn: 'PLAYER_TURN', // Indicates that it is the player turn
	characterTurnEnd: 'CHARACTER_TURN_END', // Ends the character turn
	playerAttack: 'PLAYER_ATTACK', // Shows the player attack dialog
	showMonsterPositions: 'SHOW_MONSTER_POSITIONS', // Prompts the monster controller to pick a monster position
	showMonsterPositionsResult: 'SHOW_MONSTER_POSITIONS_RESULT', // Returns monster controller results
	processMonsterAction: 'PROCESS_MONSTER_ACTION', // triggers the processing of the next monster action
	criticalInjury: 'CRITICAL_INJURY', // triggers the processing of the next monster action
	victory: 'VICTORY' // Displays when the monster is killed
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
		if (state.status !== BOARD_STATUSES.victory) {
			return {
				status: action.status,
				data: action.data
			};
		} else {
			return state;
		}
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
