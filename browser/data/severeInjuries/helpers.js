import {addTokenToCharacter, TOKEN_TYPES} from '../../../common/gameState/tokens';
import {killCharacter} from '../../reducers/character';

export const killSurvivor = (target) => (dispatch, getState) => {
	const { room } = getState();
	dispatch(killCharacter(room[`character${target + 1}_id`]));
};

export const addBleed = (target, count) => (dispatch, getState) => {
	for (let i = 0; i < count; i++) {
		dispatch(addTokenToCharacter(target, TOKEN_TYPES.bleeding));
	}
	const { room } = getState();
	const bleedingTokens = room.gameState.tokens[target].filter((token) => token.tokenType === TOKEN_TYPES.bleeding).length;
	if (bleedingTokens >= 5) {
		dispatch(killSurvivor(target));
	}
};
