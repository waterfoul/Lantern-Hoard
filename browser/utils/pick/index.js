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
