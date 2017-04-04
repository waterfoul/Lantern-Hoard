const STATUSES = {
	knockedDown: 'KNOCKED_DOWN',
	readyToStand: 'READY_TO_STAND',
	standing: 'STANDING'
};

//actions
const KNOCK_DOWN_CHARACTER = 'KNOCK_DOWN_CHARACTER';
const BEGIN_MONSTER = 'BEGIN_MONSTER';
const END_MONSTER = 'END_MONSTER';

//reducer
const knockedDownCharacters = (state = [
	STATUSES.standing,
	STATUSES.standing,
	STATUSES.standing,
	STATUSES.standing
], action) => {
	switch (action.type) {
		case KNOCK_DOWN_CHARACTER: {
			const result = [...state];
			result[action.player] = result[action.player] === STATUSES.standing ? STATUSES.knockedDown : result[action.player];
			return result;
		}
		case BEGIN_MONSTER:
			return state.map((ele) => (ele === STATUSES.knockedDown ? STATUSES.readyToStand : ele));
		case END_MONSTER:
			return state.map((ele) => (ele === STATUSES.readyToStand ? STATUSES.standing : ele));
		default:
			return state;
	}
};

//action creators
const knockDownCharacter = (player) => ({
	type: KNOCK_DOWN_CHARACTER,
	player
});
const endMonster = () => ({
	type: END_MONSTER
});
const beginMonster = () => ({
	type: BEGIN_MONSTER
});

module.exports = {
	knockedDownCharacters,
	knockDownCharacter,
	beginMonster,
	endMonster,
	STATUSES
};
