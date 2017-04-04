import { moveMonster } from '../../../reducers/gameState/positions';
import { processAttack } from '../../../reducers/gameState/monsterController';
import { changeBoardStatusAction, BOARD_STATUSES } from '../../../../common/gameState/board';
import { adjustMonsterStats } from '../../../../common/gameState/monsterStats';
import { addPersistentInjury } from '../../../../common/gameState/effects';
import { removeFromDiscard } from '../../../../common/gameState/hl';
import { woundAI } from '../../../reducers/gameState/ai';
import { TRIGGERS } from '../../../utils/effects';
import { ai } from './ai';


function moveForward(dispatch, getState) {
	const { room } = getState();
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
		// default makes linter happy
		default:
			return null;
	}
	// TODO: Add Grab functionality
}

function jumpBack(dispatch, getState) {
	const { room } = getState();
	const attacker = room.gameState.board.data.slot;
	const attackerPosition = room.gameState.positions[`player${attacker + 1}`];
	const monsterPosition = room.gameState.positions.monster;
	const monsterSize = room.gameState.monsterStats.size;
	let diffX = monsterPosition[0] - attackerPosition[0];
	let diffY = monsterPosition[1] - attackerPosition[1];

	if (diffY < monsterSize && diffY > 0) diffY = 0;
	if (diffX > (-1 * monsterSize) && diffX < 0) diffX = 0;
	if (diffX === 0 || Math.abs(diffX) < Math.abs(diffY)) {
		dispatch(moveMonster([monsterPosition[0], monsterPosition[1] + diffY / Math.abs(diffY)]));
	} else {
		dispatch(moveMonster([monsterPosition[0] + diffX / Math.abs(diffX), monsterPosition[1]]));
	}
}

function giveToken(dispatch, getState, value, tokenType) {
	dispatch(adjustMonsterStats({ [tokenType]: value } ));
}

const persistentInjury = (card, name, other = {}) => (dispatch) => {
	dispatch(addPersistentInjury(name, hl[card].img, other));
	dispatch(removeFromDiscard(card));
};

// TODO: Stub! Implement and remove BOTH of these comments
// eslint-disable-next-line
const knockDownLion = () => (dispatch, getState) => {
};

// TODO: Stub! Implement and remove BOTH of these comments
// eslint-disable-next-line
const gainWhiteLionResource = (name = null) => (dispatch, getState) => {
};

function counterAttack(dispatch, getState, mods = {}, nextState = null) {
	const { room } = getState();
	if (!nextState) {
		nextState = [room.gameState.board.status, room.gameState.board.data];
	}

	dispatch(processAttack(room.gameState.board.data.slot, Object.assign(
		{},
		ai.cards['Basic Action'].actions[1],
		mods
	), nextState));
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
		// TODO: Stub! Implement and remove BOTH of these comments
		// eslint-disable-next-line
		crit: (dispatch, getState) => {
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
		// TODO: Stub! Implement and remove BOTH of these comments
		// eslint-disable-next-line
		crit: (dispatch, getState) => {
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
				// TODO: Stub! Implement and remove BOTH of these comments
				// eslint-disable-next-line
				action: (dispatch, getState) => {
				}
			}
		],
		crit: (dispatch) => {
			dispatch(knockDownLion());
		}
	},
	'Beasts Heel': {
		img: '/static/white-lion/hl/beasts-heel.jpg',
		crit: (dispatch) => {
			dispatch(persistentInjury(
				'Beasts Heel',
				'Ruptured Tendon',
				{ triggers: [{
					trigger: TRIGGERS.monsterMovementStart,
					// TODO: Stub! Implement and remove BOTH of these comments
					// eslint-disable-next-line
					thunk: () => (dispatchInner, getState) => {
						// TODO: roll a d10, on a 1 knock down lion
					}
				}] }
			));
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
				// TODO: Stub! Implement and remove BOTH of these comments
				// eslint-disable-next-line
				action: (dispatch, getState) => {
				}
			}
		],
		crit: (dispatch) => {
			dispatch(persistentInjury('Beasts Maw', 'No Jaw'));
			// TODO: Roll 1d10, 5+ attacker get +1 courage +1 survival
		}
	},
	'Beasts Paw': {
		img: '/static/white-lion/hl/beasts-paw.jpg',
		triggers: [
			{
				type: 'failure',
				action: (dispatch, getState) => {
					counterAttack(dispatch, getState, { damage: 3 });
				}
			}
		],
		crit: (dispatch, getState) => {
			dispatch(persistentInjury('Beasts Paw', 'Broken Foot', { triggers: [{
				trigger: TRIGGERS.grab,
				fn: () => false
			}] }));
			giveToken(dispatch, getState, -1, 'movement');
			dispatch(gainWhiteLionResource());
		}
	},
	'Beasts Ribs': {
		img: '/static/white-lion/hl/beasts-ribs.jpg',
		triggers: [
			{
				type: 'wound',
				// TODO: Stub! Implement and remove BOTH of these comments
				// eslint-disable-next-line
				action: (dispatch, getState) => {
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
				action: counterAttack
			}
		],
		// TODO: Stub! Implement and remove BOTH of these comments
		// eslint-disable-next-line
		crit: (dispatch, getState) => {
			dispatch(persistentInjury('Beasts Temple', 'Beasts Temple', { triggers: [{
				trigger: TRIGGERS.AIDraw,
				fn: () => {
					// TODO: roll die, on 1/2 end lion turn and return true
					return false;
				}
			}] }));
		}
	},
	'Beasts Tricep': {
		img: '/static/white-lion/hl/beasts-tricep.jpg',
		triggers: [
			{
				type: 'failure',
				action: counterAttack
			}
		],
		// TODO: Stub! Implement and remove BOTH of these comments
		// eslint-disable-next-line
		crit: (dispatch, getState) => {
		}
	},
	'Clever Ploy': {
		img: '/static/white-lion/hl/clever-ploy.jpg',
		trap: true,
		action: (dispatch, getState) => {
			const { room } = getState();
			const data = room.gameState.board.data;

			counterAttack(dispatch, getState, {}, [data.turnStatus.status, data.turnStatus.data]);
		}
	},
	'Fleshy Gut': {
		img: '/static/white-lion/hl/fleshy-gut.jpg',
		triggers: [
			{
				type: 'failure',
				action: counterAttack
			}
		],
		// TODO: Stub! Implement and remove BOTH of these comments
		// eslint-disable-next-line
		crit: (dispatch, getState) => {
		}
	},
	'Fuzzy Groin': {
		img: '/static/white-lion/hl/fuzzy-groin.jpg',
		crit: (dispatch, getState) => {
			giveToken(dispatch, getState, 1, 'damage');
			// TODO: Give priority Target
			// TODO: Add trigger which doesn't allow prioity target to move around
			dispatch(persistentInjury('Fuzzy Groin', 'Lost Ding Dong'));
		}
	},
	'Glorious Mane': {
		img: '/static/white-lion/hl/glorious-mane.jpg',
		impervious: true,
		// TODO: Stub! Implement and remove BOTH of these comments
		// eslint-disable-next-line
		crit: (dispatch, getState) => {
		}
	},
	'Soft Belly': {
		img: '/static/white-lion/hl/soft-belly.jpg',
		crit: (dispatch) => {
			dispatch(gainWhiteLionResource());
			dispatch(persistentInjury('Soft Belly', 'Organ Trail', { triggers: [{
				trigger: TRIGGERS.monsterTurnStart,
				type: 'hl',
				card: 'Soft Belly',
				thunk: 0
			}] }));
		},
		triggers: [
			// TODO: Stub! Implement and remove BOTH of these comments
			// eslint-disable-next-line
			(nextState) => (dispatch, getState) => {
				dispatch(changeBoardStatusAction(BOARD_STATUSES.triggerRoll, {
					title: 'Roll for Soft Belly',
					img: '/static/white-lion/hl/soft-belly.jpg',
					trigger: {
						type: 'hl',
						card: 'Soft Belly',
						thunk: 1
					},
					nextState
				}));
			},
			// TODO: Stub! Implement and remove BOTH of these comments
			// eslint-disable-next-line
			(result, nextState) => (dispatch, getState) => {
				if (result === 1) {
					dispatch(woundAI());
				}
				dispatch(changeBoardStatusAction.apply(null, nextState));
			}
		]
	},
	'Straining Neck': {
		img: '/static/white-lion/hl/straining-neck.jpg',
		// TODO: Stub! Implement and remove BOTH of these comments
		// eslint-disable-next-line
		crit: (dispatch, getState) => {
			// TODO
		}
	},
	'Strange Hand': {
		img: '/static/white-lion/hl/strange-hand.jpg',
		triggers: [
			{
				type: 'failure',
				action: counterAttack
			}
		],
		// TODO: Stub! Implement and remove BOTH of these comments
		// eslint-disable-next-line
		crit: (dispatch, getState) => {
			// TODO: Spend 1 survival to gain 1 permant strength
			dispatch(persistentInjury('Strange Hand', 'Lost Hand'));
		}
	}
};
