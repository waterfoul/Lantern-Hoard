import {changeBoardStatusAction, BOARD_STATUSES} from '../../../common/gameState/board';
import {STATUSES} from '../../../common/gameState/knockedDownCharacters';
import {store} from '../../store';
import {getXYDistance} from '../getDistance';

export function isThreat(gameState, i) {
	return gameState.threats[i] && gameState.knockedDownCharacters[i] === STATUSES.standing;
}

export function chooseBetween(characters, dispatch) {
	return new Promise((resolve) => {
		dispatch(changeBoardStatusAction(BOARD_STATUSES.targetChoice, characters));

		const unsub = store.subscribe(() => {
			const {room} = store.getState();
			if (room.gameState.board.status === BOARD_STATUSES.targetChosen) {
				resolve(room.gameState.board.data);
				dispatch(changeBoardStatusAction(BOARD_STATUSES.generic));
				unsub();
			}
		});
	});
}

export function isFront(monsterDirection, size, monster, player) {
	const {X, Y} = getXYDistance(size, monster, player);
	switch (monsterDirection) {
	case 'N':
		return Y < 0;
	case 'S':
		return Y > 0;
	case 'E':
		return X < 0;
	case 'W':
		return X > 0;
	default:
		return false;
	}
}

export const findClosestAndChoose = (distances, dispatch) => {
	// Get the minimum distance
	const min = Math.min.apply(Math, distances.filter((val) => val !== null));

	// Null out the values > min, converting the correct values into their indexes
	let resultArr = distances
		.map((val, i) => val === min ? i : null);

	// Filter off the nulls
	resultArr = resultArr
		.filter((val) => val !== null);

	if (resultArr.length === 0) {
		// No result
		return Promise.resolve(null);
	} else if (resultArr.length === 1) {
		// One result
		return Promise.resolve(resultArr[0]);
	} else {
		return chooseBetween(resultArr, dispatch);
	}
};

// This method's compexity is OK since most of it comes from the return statements
// eslint-disable-next-line complexity
export function checkFieldOfView(gameState, position) {
	const monsterPosition = gameState.positions.monster;
	const monsterSize = gameState.monsterStats.size;

	const xDifference = position[0] - monsterPosition[0];
	const xWithinMonster = xDifference < 0 || xDifference >= monsterSize;

	const yDfference = monsterPosition[1] - position[1];
	const yWithinMonster = yDfference < 0 || yDfference >= monsterSize;

	if (gameState.monsterDirection === 'S') {
		return position[1] !== (monsterPosition[1] + 1) || xWithinMonster;
	}
	else if (gameState.monsterDirection === 'N') {
		return position[1] !== (monsterPosition[1] - monsterSize) || xWithinMonster;
	}
	else if (gameState.monsterDirection === 'E') {
		return position[0] !== (monsterPosition[0] - 1) || yWithinMonster;
	}
	else if (gameState.monsterDirection === 'W') {
		return position[0] !== (monsterPosition[0] + monsterSize) || yWithinMonster;
	}
}
