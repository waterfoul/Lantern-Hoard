import {moveMonster} from '../../../reducers/gameState/positions';
import {processAttack} from '../../../reducers/gameState/monsterController';
import {BOARD_STATUSES} from '../../../../common/gameState/board';
import {ai} from './ai';

function moveForward(dispatch, getState) {
	const {room} = getState();
	const monsterMovement = room.gameState.monsterStats.movement;
	const monsterPosition = room.gameState.positions.monster;
	const monsterDirection = room.gameState.monsterDirection;
	switch (monsterDirection) {
	case 'N':
		dispatch(moveMonster([monsterPosition[0], monsterPosition[1] + monsterMovement]));
		break;
	case 'S':
		dispatch(moveMonster([monsterPosition[0], monsterPosition[1] - monsterMovement]));
		break;
	case 'E':
		dispatch(moveMonster([monsterPosition[0] + monsterMovement, monsterPosition[1]]));
		break;
	case 'W':
		dispatch(moveMonster([monsterPosition[0] - monsterMovement, monsterPosition[1]]));
		break;
	}
	// TODO: Add Grab functionality
}

function jumpBack(dispatch, getState) {
	console.log('JUMP BACK!');
}

function giveToken(dispatch, getState, value, tokenType) {
	console.log('GIVE TOKEN');
	// Function for giving -1 tokens (accuracy, movement, or toughness) to White Lion
}

function persistentInjury(dispatch, getState, card) {
	console.log('THIS HL CARD BECOMES A PERSISTENT INJURY');
	// Function for making a HL card a persistent injury
}

function counterAttack(dispatch, getState, mods = {}, nextState = null) {
	const {room} = getState();
	if (!nextState) {
		nextState = [room.gameState.board.status, room.gameState.board.data];
	}

	console.log(processAttack);
	processAttack(room.gameState.board.data.slot, room.gameState, dispatch, Object.assign(
		{},
		ai.cards['Basic Action'].actions[1],
		mods
	), nextState);
}

export const hl = {
	'Beasts Back': {
		img: '/static/white-lion/hl/beasts-back.jpg',
		triggers: [
			{
				type: 'failure',
				action: moveForward
			}
		],
		crit: (dispatch, getState) => {
			giveToken(dispatch, getState, -1, 'accuracy');
		}
	},
	'Beasts Brow': {
		img: '/static/white-lion/hl/beasts-brow.jpg',
		triggers: [
			{
				type: 'wound',
				action: (dispatch, getState) => {
					console.log('WOUND!');
					counterAttack(dispatch, getState);
					// Attacker suffers 1 brain damage
				}
			}
		],
		crit: (dispatch, getState) => {
			giveToken(dispatch, getState, -1, 'accuracy');
		}
	},
	'Beasts Chest': {
		img: '/static/white-lion/hl/beasts-chest.jpg',
		triggers: [
			{
				type: 'failure',
				action: moveForward
			}
		],
		crit: (dispatch, getState) => {
			console.log('CRIT!');
			// Chance of WL dying instantly
		}
	},
	'Beasts Ear': {
		img: '/static/white-lion/hl/beasts-ear.jpg',
		triggers: [
			{
				type: 'failure',
				action: jumpBack
			}
		],
		crit: (dispatch, getState) => {
			giveToken(dispatch, getState, -1, 'accuracy');
		}
	},
	'Beasts Elbow': {
		img: '/static/white-lion/hl/beasts-elbow.jpg',
		triggers: [
			{
				type: 'failure',
				action: moveForward
			}
		],
		crit: (dispatch, getState) => {
			console.log('CRIT!');
		}
	},
	'Beasts Femur': {
		img: '/static/white-lion/hl/beasts-femur.jpg',
		crit: (dispatch, getState) => {
			giveToken(dispatch, getState, -1, 'movement');
		}
	},
	'Beasts Flank': {
		img: '/static/white-lion/hl/beasts-flank.jpg',
		triggers: [
			{
				type: 'wound',
				action: (dispatch, getState) => {
					console.log('WOUND!');
				}
			}
		],
		crit: (dispatch, getState) => {
			console.log('CRIT!');
		}
	},
	'Beasts Heel': {
		img: '/static/white-lion/hl/beasts-heel.jpg',
		crit: (dispatch, getState) => {
			persistentInjury(dispatch, getState, 'Beasts Heel');
		}
	},
	'Beasts Knee': {
		img: '/static/white-lion/hl/beasts-knee.jpg',
		crit: (dispatch, getState) => {
			giveToken(dispatch, getState, -1, 'movement');
		}
	},
	'Beasts Maw': {
		img: '/static/white-lion/hl/beasts-maw.jpg',
		triggers: [
			{
				type: 'failure',
				action: (dispatch, getState) => {
					console.log('FAIL!');
				}
			}
		],
		crit: (dispatch, getState) => {
			persistentInjury(dispatch, getState, 'Beasts Maw');
		}
	},
	'Beasts Paw': {
		img: '/static/white-lion/hl/beasts-paw.jpg',
		triggers: [
			{
				type: 'failure',
				action: (dispatch, getState) => {
					counterAttack(dispatch, getState, {damage: 3});
				}
			}
		],
		crit: (dispatch, getState) => {
			persistentInjury(dispatch, getState, 'Beasts Paw');
		}
	},
	'Beasts Ribs': {
		img: '/static/white-lion/hl/beasts-ribs.jpg',
		triggers: [
			{
				type: 'wound',
				action: (dispatch, getState) => {
					console.log('WOUND!');
				}
			}
		],
		crit: (dispatch, getState) => {
			giveToken(dispatch, getState, -1, 'toughness');
		}
	},
	'Beasts Scapular Deltoid': {
		img: '/static/white-lion/hl/beasts-scapular-deltoid.jpg',
		triggers: [
			{
				type: 'failure',
				action: moveForward
			}
		],
		crit: (dispatch, getState) => {
			giveToken(dispatch, getState, -1, 'movement');
		}
	},
	'Beasts Tail': {
		img: '/static/white-lion/hl/beasts-tail.jpg',
		triggers: [
			{
				type: 'reflex',
				action: moveForward
			}
		],
		crit: (dispatch, getState) => {
			giveToken(dispatch, getState, -1, 'accuracy');
		}
	},
	'Beasts Temple': {
		img: '/static/white-lion/hl/beasts-temple.jpg',
		triggers: [
			{
				type: 'failure',
				action: (dispatch, getState) => {
					counterAttack(dispatch, getState);
				}
			}
		],
		crit: (dispatch, getState) => {
			persistentInjury(dispatch, getState, 'Beasts Temple');
		}
	},
	'Beasts Tricep': {
		img: '/static/white-lion/hl/beasts-tricep.jpg',
		triggers: [
			{
				type: 'failure',
				action: (dispatch, getState) => {
					counterAttack(dispatch, getState);
				}
			}
		],
		crit: (dispatch, getState) => {
			console.log('CRIT!');
		}
	},
	'Clever Ploy': {
		img: '/static/white-lion/hl/clever-ploy.jpg',
		trap: true,
		action: (dispatch, getState) => {
			const {room} = getState();
			const data = room.gameState.board.data;

			counterAttack(dispatch, getState, {}, [BOARD_STATUSES.playerTurn, data.character]);
		}
	},
	'Fleshy Gut': {
		img: '/static/white-lion/hl/fleshy-gut.jpg',
		triggers: [
			{
				type: 'failure',
				action: (dispatch, getState) => {
					counterAttack(dispatch, getState);
				}
			}
		],
		crit: (dispatch, getState) => {
			console.log('CRIT!');
		}
	},
	'Fuzzy Groin': {
		img: '/static/white-lion/hl/fuzzy-groin.jpg',
		crit: (dispatch, getState) => {
			persistentInjury(dispatch, getState, 'Fuzzy Groin');
		}
	},
	'Glorious Mane': {
		img: '/static/white-lion/hl/glorious-mane.jpg',
		impervious: true,
		crit: (dispatch, getState) => {
			console.log('CRIT!');
		}
	},
	'Soft Belly': {
		img: '/static/white-lion/hl/soft-belly.jpg',
		crit: (dispatch, getState) => {
			console.log('CRIT!');
		}
	},
	'Straining Neck': {
		img: '/static/white-lion/hl/straining-neck.jpg',
		crit: (dispatch, getState) => {
			persistentInjury(dispatch, getState, 'Straining Neck');
		}
	},
	'Strange Hand': {
		img: '/static/white-lion/hl/strange-hand.jpg',
		triggers: [
			{
				type: 'failure',
				action: (dispatch, getState) => {
					counterAttack(dispatch, getState);
				}
			}
		],
		crit: (dispatch, getState) => {
			persistentInjury(dispatch, getState, 'Strange Hand');
		}
	}
};
