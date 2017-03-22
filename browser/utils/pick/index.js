import {isFront, chooseBetween} from './utils';
import {randomIndex} from '../randomIndex';
import {getDistance} from '../getDistance';

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
		return chooseBetween(resultArr, dispatch);
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

export function randomInRange(gameState) {
	const distances = [
		gameState.positions.player1,
		gameState.positions.player2,
		gameState.positions.player3,
		gameState.positions.player4
	].map((val) => {
		const distance = getDistance(gameState.monsterStats.size, gameState.positions.monster, val);
		if (distance > gameState.monsterStats.movement + gameState.monsterStats.range) {
			// Out of range
			return null;
		}
		return distance;
	});

	const min = Math.min.apply(Math, distances.filter((val) => val !== null));

	const resultArr = distances
		.map((val, i) => val === min ? i : null)
		.filter((val) => val !== null);

	return Promise.resolve(randomIndex(resultArr));
}

export function closestWithMostBleeding(boardState) {
	return Promise.resolve(null);
}

export function victimOfGrabLastRound(boardState) {
	return Promise.resolve(null);
}
