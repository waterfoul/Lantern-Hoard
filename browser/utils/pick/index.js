import {isFront, findClosestAndChoose, checkFieldOfView, isThreat} from './utils';
import { randomIndex } from '../randomIndex';
import { getDistance } from '../getDistance';
import { STATUSES } from '../../../common/gameState/knockedDownCharacters';

export function closestThreatFacingInRange(getState, dispatch) {
	const {room: {gameState}} = getState();

	const positions = [
		gameState.positions.player1,
		gameState.positions.player2,
		gameState.positions.player3,
		gameState.positions.player4
	];

	// Build the distance array, changing all invalid targets to null
	const distances = positions.map((val, i) => {
		if (!isThreat(gameState, i)) {
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

export function closestThreatInFieldOfView(getState, dispatch) {
	const {room: {gameState}} = getState();

	const positions = [
		gameState.positions.player1,
		gameState.positions.player2,
		gameState.positions.player3,
		gameState.positions.player4
	];
	const charactersInView = positions
		.map((position, i) => ((checkFieldOfView(gameState, position) && isThreat(gameState, i)) ? (
			getDistance(gameState.monsterStats.size, gameState.positions.monster, position)
		) : null));
	return findClosestAndChoose(charactersInView, dispatch);
}

export function closestInFieldOfView(getState, dispatch) {
	const {room: {gameState}} = getState();

	const positions = [
		gameState.positions.player1,
		gameState.positions.player2,
		gameState.positions.player3,
		gameState.positions.player4
	];
	const charactersInView = positions
		.map((position, i) => ((checkFieldOfView(gameState, position)) ? (
				getDistance(gameState.monsterStats.size, gameState.positions.monster, position)
			) : null));
	return findClosestAndChoose(charactersInView, dispatch);
}

export function closestKnockedDownInRange(getState, dispatch) {
	const {room: {gameState}} = getState();

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

export function closestInRange(getState, dispatch) {
	const {room: {gameState}} = getState();

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

export function lastToWoundInRange(getState, dispatch) {
	const {room: {gameState}} = getState();
	const lastToWoundOrder = gameState.woundOrder;
	const positions = lastToWoundOrder.map((slot) => {
		return gameState.positions[`player${slot + 1}`];
	});

	const distances = positions.map((val, i) => {
		const distance = getDistance(gameState.monsterStats.size, gameState.positions.monster, val); //size, monst type, player
		if (distance > gameState.monsterStats.movement + gameState.monsterStats.range) {
			// Out of range
			return null;
		}
		return lastToWoundOrder[i];
	}).filter((val) => val !== null);

	if (distances.length === 0) {
		return Promise.resolve(null);
	}
	return Promise.resolve(distances[0]);
}

export function randomThreatInFieldOfView(getState) {
	const {room: {gameState}} = getState();

	// Board positions of all characters
	const positions = [
		gameState.positions.player1,
		gameState.positions.player2,
		gameState.positions.player3,
		gameState.positions.player4
	];
	// Check which characters are within the monster's field of view
	const charactersInView = positions
		.map((position, i) => ((checkFieldOfView(gameState, position) && isThreat(gameState, i)) ? i : null))
		.filter((idx) => idx !== null);

	return Promise.resolve(randomIndex(charactersInView));
}

export function randomInRange(getState) {
	const {room: {gameState}} = getState();
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
