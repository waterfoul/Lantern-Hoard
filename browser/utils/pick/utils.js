import {changeBoardStatusAction, BOARD_STATUSES} from '../../../common/gameState/board';
import {store} from '../../store';
import {getXYDistance} from '../getDistance';

export function chooseBetween(characters, dispatch) {
	return new Promise((resolve, reject) => {
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

export function checkFieldOfView(gameState, position ) {
	const monsterPosition = gameState.positions.monster;
	const monsterSize = gameState.monsterStats.size;

	if (gameState.monsterDirection === 'S') {
		const difference = position[0] - monsterPosition[0];
		return position[1] !== (monsterPosition[1] + 1) || difference < 0 || difference >= monsterSize;
	}
	else if (gameState.monsterDirection === 'N') {
		const difference = position[0] - monsterPosition[0];
		return position[1] !== (monsterPosition[1] - monsterSize) || difference < 0 || difference >= monsterSize;
	}
	else if (gameState.monsterDirection === 'E') {
		const difference = monsterPosition[1] - position[1];
		return position[0] !== (monsterPosition[0] - 1) || difference < 0 || difference >= monsterSize;
	}
	else if (gameState.monsterDirection === 'W') {
		const difference =  monsterPosition[1] - position[1];
		return position[0] !== (monsterPosition[0] + monsterSize) || difference < 0 || difference >= monsterSize;
	}
}
