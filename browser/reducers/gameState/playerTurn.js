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

function selectActingCharacter (dispatch, characters) {
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

export const startPlayerTurn = () => (
	(dispatch, getState) => {
		console.log('Begin Player Turn');
		dispatch(startMonsterTurn());
	}
);
