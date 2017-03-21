import {changeBoardStatusAction, BOARD_STATUSES} from '../../../common/gameState/board';
import {store} from '../../store';

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

function getXYDistance(size, monster, player) {
	let X = monster[0] - player[0];
	let Y = monster[1] - player[1];
	if (X < 0) {
		X += (size - 1);
	}
	if (Y > 0) {
		Y -= (size - 1);
	}
	return {X, Y};
}

export function getDistance(size, monster, player) {
	const {X, Y} = getXYDistance(size, monster, player);
	return Math.abs(X) + Math.abs(Y);
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