// Determine which character will act (player's choice)
// move and then act || act and then move
// Determine if there are more characters who need a turn
// If so, repeat
// When all characters have taken a turn, go to Monster turn

// function to choose which character will go (similar to chooseBetween)

// function to move a character (only controlling player can move the character)

// function to use an action

// Buttons for action, move, and end turn
import {startMonsterTurn} from './monsterController';
import {BOARD_STATUSES, changeBoardStatusAction} from '../../../common/gameState/board';
import {store} from '../../store';
import {moveToken} from '../../../common/gameState/positions';
import {changePlayerResources, useMovement, useAction} from '../../../common/gameState/playerResources';

// Gets player input for selecting character turn
function selectActingCharacter (dispatch, characters) {
	if (characters.length === 1) {
		return Promise.resolve(characters[0]);
	}
	return new Promise((resolve, reject) => {
		dispatch(changeBoardStatusAction(BOARD_STATUSES.selectActingCharacter, characters));

		const unsub = store.subscribe(() => {
			const {room} = store.getState();
			if (room.gameState.board.status === BOARD_STATUSES.actingCharacterChosen) {
				resolve(room.gameState.board.data);
				dispatch(changeBoardStatusAction(BOARD_STATUSES.generic));
				unsub();
			}
		});
	});
}

// Gets player input for character movement
function getCharacterMoveInput (dispatch, character) {
	return new Promise((resolve, reject) => {
		dispatch(changeBoardStatusAction(BOARD_STATUSES.showAvailableMovement, character));

		const unsub = store.subscribe(() => {
			const {room} = store.getState();
			if (room.gameState.board.status === BOARD_STATUSES.moveCharacter) {
				resolve(room.gameState.board.data);
				dispatch(changeBoardStatusAction(BOARD_STATUSES.playerTurn, character));
				unsub();
			}
		});
	});
}

function characterTurn (dispatch, availableCharacters = [0, 1, 2, 3]) {
	return selectActingCharacter(dispatch, availableCharacters)
		.then((player) => {
			dispatch(changeBoardStatusAction(BOARD_STATUSES.playerTurn, player));
			dispatch(changePlayerResources(1, 1));
			return player;
		})
		.then((player) => {
			if (availableCharacters.length > 1) {
				return characterTurn(dispatch, availableCharacters.filter((element) => element !== player));
			}
		});
}

// Thunks

// Is a thunk that moves the character
export const moveCharacter = (character) => (
	(dispatch, getState) => {
		getCharacterMoveInput(dispatch, character)
			.then((coordinates) => {
				dispatch(moveToken(`player${character + 1}`, coordinates));
				dispatch(useMovement());
			});
	}
);

export const startPlayerTurn = () => (
	(dispatch, getState) => {
		characterTurn(dispatch)
			.then(() => {
				dispatch(startMonsterTurn());
			});
	}
);
