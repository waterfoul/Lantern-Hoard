export function getStats(character, gameState, slot, extraMods = {}) {
	// TODO: tokens
	return {
		movement: getMovement(character, gameState, slot, extraMods),
		accuracy: getAccuracy(character, gameState, slot, extraMods),
		strength: getStrength(character, gameState, slot, extraMods),
		evasion: getEvasion(character, gameState, slot, extraMods),
		luck: getLuck(character, gameState, slot, extraMods),
		speed: getSpeed(character, gameState, slot, extraMods)
	};
}

export function getMovement(character, gameState, slot, extraMods = {}) {
	return character.movement + (extraMods.movement || 0);
}

export function getAccuracy(character, gameState, slot, extraMods = {}) {
	return character.accuracy + (extraMods.accuracy || 0);
}

export function getStrength(character, gameState, slot, extraMods = {}) {
	return character.strength + (extraMods.strength || 0);
}

export function getEvasion(character, gameState, slot, extraMods = {}) {
	return character.evasion + (extraMods.evasion || 0);
}

export function getLuck(character, gameState, slot, extraMods = {}) {
	return character.luck + (extraMods.luck || 0);
}

export function getSpeed(character, gameState, slot, extraMods = {}) {
	return character.speed + (extraMods.speed || 0);
}
