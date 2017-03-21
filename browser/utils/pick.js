function chooseBetween(characters, dispatch) {

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
	switch(monsterDirection) {
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

export function closestThreatFacingInRange(gameState, dispatch) {
	const positions = [
		gameState.positions.player1,
		gameState.positions.player2,
		gameState.positions.player3,
		gameState.positions.player4
	];

	// Build the distance array, changing all invalid targets to null
	const distances = positions.map((val, i) => {
		if (!gameState.threats[i]) {
			// Not a threat
			return null;
		}
		if (!isFront(
				gameState.monsterDirection,
				gameState.monsterStats.size,
				gameState.positions.monster,
				val
			)) {
			// Not in front so not facing
			return null;
		}
		const distance = getDistance(gameState.monsterStats.size, gameState.positions.monster, val);
		if (distance > gameState.monsterStats.movement + gameState.monsterStats.range) {
			// Out of range
			return null;
		}
		return distance;
	});

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
		return Promise.resolve(null);
		// Many results, let the player pick
		// set gameState.board.status to playerPick
		// return new Promise((resolve, reject) => {
		// 	// Send data to redux state to trigger the "player chooses" ui
		// 	const unsub = store.subscribe(() => {
		// 		// if gameState.board.status === playerFinishedPicking
		// 		resolve(result);
		// 	});
		// });
	}
}

export function closestThreatInFieldOfView(boardState) {
	return Promise.resolve(null);
}

export function closestKnockedDownInRange(boardState) {
	return Promise.resolve(null);
}

export function closestInRange(boardState) {
	return Promise.resolve(null);
}

export function lastToWoundInRange(boardState) {
	return Promise.resolve(null);
}

export function randomThreatInFieldOfView(boardState) {
	return Promise.resolve(null);
}

export function randomInRange(boardState) {
	return Promise.resolve(null);
}

export function closestWithMostBleeding(boardState) {
	return Promise.resolve(null);
}

export function victimOfGrabLastRound(boardState) {
	return Promise.resolve(null);
}
