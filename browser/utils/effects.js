// Triggers are objects in the following format
/*
{
	trigger: Constant,
 (optional) thunk: Will be triggered for thunk based triggers
 (optional) fn: Will be triggered for function based triggers
}
 */

export const TRIGGERS = {
	monsterMovementStart: 'MONSTER_MOVEMENT_START', // TODO: Add this as a trigger
	// Thunk: for any time the monster moves, run the method before movement, check for
	// monster being knocked down after running methods, and if so cancel the movement
	grab: 'GRAB', // TODO: Add this as a trigger, Function which returns true/false if the grab goes off,
	AIDraw: 'AI_DRAW', // TODO: Add this as a trigger, function which returns true/false if the attack is canceled
	monsterTurnStart: 'MONSTER_TURN_START', // TODO: Add this as a trigger, thunk which fires at the start of the monster turn before anything happens
	dismemberment: 'DISMEMBERMENT', // TODO: Add this as a trigger, thunk fires when player is dismembered
	playerKilled: 'PLAYER_KILLED' // TODO: Add this as a trigger, thunk fires when player is killed
};
