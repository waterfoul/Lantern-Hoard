import { damageArmorAction } from '../../../common/gameState/armor';
import { knockDownCharacter } from '../../../common/gameState/knockedDownCharacters';
import { BOARD_STATUSES, changeBoardStatusAction } from '../../../common/gameState/board';

//externals
export const damageArmor = (player, locations, amount, nextState) => (
	(dispatch, getState) => {
		const { room } = getState();
		if (locations.length === 0) {
			dispatch(changeBoardStatusAction.apply(null, nextState));
		} else {
			const playerArmor = room.gameState.armor[player];
			const [currentLocation, ...newLocations] = locations;
			let critical = false;

			if (currentLocation === 'head' && playerArmor[currentLocation] - amount === -1) {
				amount++; // Head skips the light injury
			}
			if (
				playerArmor[currentLocation] === -2 ||
				playerArmor[currentLocation] - amount < -2
			) {
				critical = true;
				amount = playerArmor[currentLocation] + 2;
			}
			if (
				playerArmor[currentLocation] > -2 &&
				playerArmor[currentLocation] - amount <= -2
			) {
				dispatch(knockDownCharacter(player));
			}
			if (playerArmor[currentLocation] !== -2) {
				dispatch(damageArmorAction(player, currentLocation, amount));
			}

			if (critical) {
				dispatch(changeBoardStatusAction(BOARD_STATUSES.criticalInjury, {player, locations: newLocations, amount, nextState, currentLocation}));
			} else {
				dispatch(damageArmor(player, newLocations, amount, nextState));
			}
		}
	}
);

export const criticalTableRoll = () => (
	(dispatch, getState) => {
		const { room } = getState();
		const data = Object.assign({}, room.gameState.board.data);
		data.roll = Math.floor(Math.random() * 10) + 1;
		dispatch(changeBoardStatusAction(BOARD_STATUSES.criticalInjury, data));
	}
);

export const applyInjury = (injury) => (
	(dispatch, getState) => {
		const { room } = getState();
		const { player, locations, amount, nextState } = room.gameState.board.data;

		dispatch(injury.thunk(player));
		dispatch(damageArmor(player, locations, amount, nextState));
	}
);