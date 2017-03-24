import {isFront, chooseBetween, findClosestAndChoose, checkFieldOfView} from './utils';
import { randomIndex } from '../randomIndex';
import { getDistance } from '../getDistance';
import { STATUSES } from '../../../common/gameState/knockedDownCharacters';

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

export function closestThreatInFieldOfView(gameState, dispatch) {
	const positions = [
		gameState.positions.player1,
		gameState.positions.player2,
		gameState.positions.player3,
		gameState.positions.player4
	];
	const charactersInView = positions
		.map((position, i) => ((checkFieldOfView(gameState, position) && gameState.threats[i]) ? (
			getDistance(gameState.monsterStats.size, gameState.positions.monster, position)
		) : null));
	return findClosestAndChoose(charactersInView, dispatch);
}

export function closestKnockedDownInRange(gameState, dispatch) {
	const positions = [
		gameState.positions.player1,
		gameState.positions.player2,
		gameState.positions.player3,
		gameState.positions.player4
	];

	const distances = positions.map((val, i) => {
		if (gameState.knockedDownCharacters[i] === STATUSES.standing) {
			// Not a knocked down
			return null;
		}
		const distance = getDistance(gameState.monsterStats.size, gameState.positions.monster, val); //size, monst type, player

		if (distance > gameState.monsterStats.movement + gameState.monsterStats.range) {
			// out of range
			return null;
		}
		return distance;
	});

	return findClosestAndChoose(distances, dispatch);
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

export function randomThreatInFieldOfView(gameState) {
	// Board positions of all characters
	const positions = [
		gameState.positions.player1,
		gameState.positions.player2,
		gameState.positions.player3,
		gameState.positions.player4
	];
	// Check which characters are within the monster's field of view
	const charactersInView = positions
		.map((position, i) => ((checkFieldOfView(gameState, position) && gameState.threats[i]) ? i : null))
		.filter((idx) => idx !== null);

	return Promise.resolve(randomIndex(charactersInView));
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
