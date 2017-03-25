import { damageArmorAction } from '../../../common/gameState/armor';
import { knockDownCharacter } from '../../../common/gameState/knockedDownCharacters';

export const damageArmor = (player, location, amount) => (
	(dispatch, getState) => {
		const { room } = getState();
		const playerArmor = room.gameState.armor[player];
		console.log('playerArmor values:', playerArmor, '\n knock down status:', room.gameState.knockedDownCharacters);

// Head injury limited to -2 for now

		if (location === 'head' && playerArmor[location] - amount === -1) {
			amount++; // Head skips the light injury
		}
		if (
			playerArmor[location] === -2 ||
			playerArmor[location] - amount < -2
		) {
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
