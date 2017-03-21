import { getDistance, isFront, findClosestAndChoose } from './utils';

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
	// // moved below to utils.js
	// // Get the minimum distance
	// const min = Math.min.apply(Math, distances.filter((val) => val !== null));

	// // Null out the values > min, converting the correct values into their indexes
	// let resultArr = distances
	// 	.map((val, i) => val === min ? i : null);

	// // Filter off the nulls
	// resultArr = resultArr
	// 	.filter((val) => val !== null);

	// if (resultArr.length === 0) {
	// 	// No result
	// 	return Promise.resolve(null);
	// } else if (resultArr.length === 1) {
	// 	// One result
	// 	return Promise.resolve(resultArr[0]);
	// } else {
	// 	return chooseBetween(resultArr, dispatch);
	// }

	return findClosestAndChoose(distances, dispatch);
}

export function closestThreatInFieldOfView(boardState) {
	return Promise.resolve(null);
}

export function closestKnockedDownInRange(boardState) {
	return Promise.resolve(null);
}

export function closestInRange(gameState, dispatch) {
	const positions = [
		gameState.positions.player1,
		gameState.positions.player2,
		gameState.positions.player3,
		gameState.positions.player4
	];

	const distances = positions.map((val, i) => {

		const distance = getDistance(gameState.monsterStats.size, gameState.positions.monster, val); //size, monst type, player
		if (distance > gameState.monsterStats.movement + gameState.monsterStats.range) {
			// Out of range
			return null;
		}
		return distance;
	});
	return findClosestAndChoose(distances, dispatch);
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
