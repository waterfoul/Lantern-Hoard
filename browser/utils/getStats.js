export function getStats(character, gameState, slot) {
	// TODO: tokens
	return {
		movement: getMovement(character, gameState, slot),
		accuracy: getAccuracy(character, gameState, slot),
		strength: getStrength(character, gameState, slot),
		evasion: getEvasion(character, gameState, slot),
		luck: getLuck(character, gameState, slot),
		speed: getSpeed(character, gameState, slot)
	};
}

export function getMovement(character, gameState, slot) {
	return character.movement;
}

export function getAccuracy(character, gameState, slot) {
	return character.accuracy;
}

export function getStrength(character, gameState, slot) {
	return character.strength;
}

export function getEvasion(character, gameState, slot) {
	return character.evasion;
}

export function getLuck(character, gameState, slot) {
	return character.luck;
}

export function getSpeed(character, gameState, slot) {
	return character.speed;
}
