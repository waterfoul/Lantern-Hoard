import {moveToken} from '../../../common/gameState/positions';
import {knockDownCharacter} from '../../../common/gameState/knockedDownCharacters';
import {checkGameState} from '../room';

//thunks
export const move = (token, location) => (
	(dispatch) => {
		dispatch(moveToken(token, location));
		dispatch(checkGameState());
	}
);

function squishChar(room, location, pos, char, players, dispatch, distance = 1) {
	const options = [
		[pos[0], pos[1] + distance],
		[pos[0], pos[1] - distance],
		[pos[0] + distance, pos[1]],
		[pos[0] - distance, pos[1]],
	].filter((opt) => {
		const optDiffX = location[0] - opt[0];
		const optDiffY = opt[1] - location[1];

		if (
			(optDiffX <= 0 && optDiffX > -1 * room.gameState.monsterStats.size) &&
			(optDiffY <= 0 && optDiffY > -1 * room.gameState.monsterStats.size)
		) {
			return false;
		}

		if (players.filter((player) => player[0] === opt[0] && player[1] === opt[1]).length) {
			return false;
		}

		return true;
	});

	if (options.length === 0) {
		return squishChar(room, location, pos, distance); //Not an ideal way to handle this but it will be a rare case so...
	} else if (options.length === 1) {
		console.log('Moving', char, 'to', options[0]);
		dispatch(knockDownCharacter(char));
		dispatch(move(`player${char + 1}`, options[0]));
	} else {
		// TODO: Offer a choice
		dispatch(knockDownCharacter(char));
		dispatch(move(`player${char + 1}`, options[0]));
	}
}

export const moveMonster = (location) => (
	(dispatch, getState) => {
		// TODO: Knock over any players that the monster would run over
		const {room} = getState();
		const players = [
			room.gameState.positions.player1,
			room.gameState.positions.player2,
			room.gameState.positions.player3,
			room.gameState.positions.player4
		];
		console.log(players, location);
		players.forEach((pos, i) => {
			const diffX = location[0] - pos[0];
			const diffY = pos[1] - location[1];

			console.log(pos, i, diffX, diffY);
			if (
				(diffX <= 0 && diffX > -1 * room.gameState.monsterStats.size) &&
				(diffY <= 0 && diffY > -1 * room.gameState.monsterStats.size)
			) {
				squishChar(room, location, pos, i, players, dispatch);
			}
		});

		dispatch(moveToken('monster', location));
	}
);
