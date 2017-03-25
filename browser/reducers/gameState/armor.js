import { damageArmorAction } from '../../../common/gameState/armor';
import { knockDownCharacter } from '../../../common/gameState/knockedDownCharacters';
import {severeInjuries} from '../../data/severeInjuries';

export const damageArmor = (player, location, amount) => (
	(dispatch, getState) => {
		const { room } = getState();
		const playerArmor = room.gameState.armor[player];

		if (location === 'head' && playerArmor[location] - amount === -1) {
			amount++; // Head skips the light injury
		}
		if (
			playerArmor[location] === -2 ||
			playerArmor[location] - amount < -2
		) {
			const currentBoard = room.gameState.board;
			console.log(currentBoard);
			// TODO: Critical Injury
			amount = playerArmor[location] + 2;
		}
		if (
			playerArmor[location] > -2 &&
			playerArmor[location] - amount <= -2
		) {
			dispatch(knockDownCharacter(player));
		}
		if (playerArmor[location] !== -2) {
			dispatch(damageArmorAction(player, location, amount));
		}
	}
);
