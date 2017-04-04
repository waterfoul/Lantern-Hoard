import {isFront, findClosestAndChoose, checkFieldOfView, isThreat} from './utils';
import { randomIndex } from '../randomIndex';
import { getDistance } from '../getDistance';
import { STATUSES } from '../../../common/gameState/knockedDownCharacters';

function getPlayerPositions(getState) {
	const {room} = getState();
	const {gameState: {positions}} = room;

	return [
		room.Character1.dead ? null : positions.player1,
		room.Character2.dead ? null : positions.player2,
		room.Character3.dead ? null : positions.player3,
		room.Character4.dead ? null : positions.player4
	];
}

export function closestThreatFacingInRange(getState, dispatch) {
	const {room: {gameState}} = getState();

	const positions = getPlayerPositions(getState);

	// Build the distance array, changing all invalid targets to null
	const distances = positions.map((val, i) => {
		if (val === null) {
			return null;
		}
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

	const positions = getPlayerPositions(getState);
	const charactersInView = positions
		.map((position, i) => ((position !== null && checkFieldOfView(gameState, position) && isThreat(gameState, i)) ? (
			getDistance(gameState.monsterStats.size, gameState.positions.monster, position)
		) : null));
	return findClosestAndChoose(charactersInView, dispatch);
}

export function closestInFieldOfView(getState, dispatch) {
	const {room: {gameState}} = getState();

	const positions = getPlayerPositions(getState);
	const charactersInView = positions
		.map((position) => ((position !== null && checkFieldOfView(gameState, position)) ? (
				getDistance(gameState.monsterStats.size, gameState.positions.monster, position)
			) : null));
	return findClosestAndChoose(charactersInView, dispatch);
}

export function closestKnockedDownInRange(getState, dispatch) {
	const {room: {gameState}} = getState();

	const positions = getPlayerPositions(getState);

	const distances = positions.map((val, i) => {
		if (val === null) {
			return null;
		}
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

	const positions = getPlayerPositions(getState);

	const distances = positions.map((val) => {
		if (val === null) {
			return null;
		}

		const distance = getDistance(gameState.monsterStats.size, gameState.positions.monster, val); //size, monst type, player
		if (distance > gameState.monsterStats.movement + gameState.monsterStats.range) {
			// Out of range
			return null;
		}
		return distance;
	});
	return findClosestAndChoose(distances, dispatch);
}

export function lastToWoundInRange(getState) {
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
	const positions = getPlayerPositions(getState);
	// Check which characters are within the monster's field of view
	const charactersInView = positions
		.map((position, i) => ((position !== null && checkFieldOfView(gameState, position) && isThreat(gameState, i)) ? i : null))
		.filter((idx) => idx !== null);

	return Promise.resolve(randomIndex(charactersInView));
}

export function randomInRange(getState) {
	const {room: {gameState}} = getState();
	const distances = getPlayerPositions(getState).map((val) => {
		if (val === null) {
			return null;
		}

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

// TODO: Stub! Implement and remove BOTH of these comments
// eslint-disable-next-line
export function closestWithMostBleeding(getState, dispatch) {
	return Promise.resolve(null);
}

// TODO: Stub! Implement and remove BOTH of these comments
// eslint-disable-next-line
export function victimOfGrabLastRound(getState, dispatch) {
	return Promise.resolve(null);
}
