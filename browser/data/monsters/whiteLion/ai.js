import {
	closestThreatFacingInRange,
	closestThreatInFieldOfView,
	closestKnockedDownInRange,
	closestInRange,
	closestInFieldOfView,
	lastToWoundInRange,
	randomThreatInFieldOfView,
	randomInRange,
	victimOfGrabLastRound,
	closestWithMostBleeding
} from '../../../utils/pick';

import { drawAICard } from '../../../reducers/gameState/ai';
import { adjustMonsterStats } from '../../../../common/gameState/monsterStats';
import { changeBoardStatusAction, BOARD_STATUSES } from '../../../../common/gameState/board';
import { TRIGGERS } from '../../../utils/effects';

// TODO: Stub! Implement and remove BOTH of these comments
// eslint-disable-next-line
export function sniff(getState) {
	return Promise.resolve(null);
}

// TODO: Stub! Implement and remove BOTH of these comments
// eslint-disable-next-line
const enragedTrigger = () => (dispatch, getState) => {
};

export const ai = {
	back: '/static/white-lion/ai/back.jpg',
	basic: {
		'Bat Around': {
			img: '/static/white-lion/ai/basic/bat-around.jpg',
			actions: [
				{
					type: 'pick',
					options: [
						closestThreatFacingInRange,
						closestThreatInFieldOfView,
						sniff
					]
				},
				{
					type: 'attack',
					move: true,
					speed: 2,
					accuracy: 5,
					damage: 1,
					trigger: {
						type: 'afterDamage',
						// TODO: Stub! Implement and remove BOTH of these comments
						// eslint-disable-next-line
						action: (boardState, target) => {}
					}
				}
			]
		},
		Chomp: {
			img: '/static/white-lion/ai/basic/chomp.jpg',
			actions: [
				{
					type: 'pick',
					options: [
						closestThreatFacingInRange,
						closestThreatInFieldOfView,
						sniff
					]
				},
				{
					type: 'attack',
					move: true,
					speed: 1,
					accuracy: 2,
					damage: 1,
					trigger: {
						type: 'afterHit',
						// TODO: Stub! Implement and remove BOTH of these comments
						// eslint-disable-next-line
						action: (boardState, target, hits) => {}
					}
				}
			],
			// TODO: Stub! Implement and remove BOTH of these comments
			// eslint-disable-next-line
			alternate: (boardState) => {
				return true;
			}
		},
		Claw: {
			img: '/static/white-lion/ai/basic/claw.jpg',
			actions: [
				{
					type: 'pick',
					options: [
						closestThreatFacingInRange,
						closestThreatInFieldOfView,
						sniff
					]
				},
				{
					type: 'attack',
					move: true,
					speed: 2,
					accuracy: 2,
					damage: 1
				}
			]
		},
		'Combo Claw': {
			img: '/static/white-lion/ai/basic/combo-claw.jpg',
			actions: [
				{
					type: 'pick',
					options: [
						closestThreatFacingInRange,
						closestThreatInFieldOfView,
						sniff
					]
				},
				{
					type: 'attack',
					move: true,
					speed: 2,
					accuracy: 4,
					damage: 1
				},
				{
					type: 'special',
					// TODO: Stub! Implement and remove BOTH of these comments
					// eslint-disable-next-line
					thunk: (nextAction) => (dispatch, getState) => {dispatch(nextAction);}
				}
			],
			// TODO: Stub! Implement and remove BOTH of these comments
			// eslint-disable-next-line
			alternate: (boardState) => {
				return true;
			}
		},
		Grasp: {
			img: '/static/white-lion/ai/basic/grasp.jpg',
			actions: [
				{
					type: 'pick',
					options: [
						closestKnockedDownInRange,
						closestInRange,
						sniff
					]
				},
				{
					type: 'attack',
					move: true,
					speed: 1,
					accuracy: 2,
					damage: 1,
					trigger: {
						type: 'afterDamage',
						// TODO: Stub! Implement and remove BOTH of these comments
						// eslint-disable-next-line
						action: (boardState, target) => {}
					}
				}
			]
		},
		'Power Swat': {
			img: '/static/white-lion/ai/basic/power-swat.jpg',
			actions: [
				{
					type: 'pick',
					options: [
						closestThreatFacingInRange,
						closestThreatInFieldOfView,
						sniff
					]
				},
				{
					type: 'attack',
					move: true,
					speed: 1,
					accuracy: 2,
					damage: 2,
					trigger: {
						type: 'afterDamage',
						// TODO: Stub! Implement and remove BOTH of these comments
						// eslint-disable-next-line
						action: (boardState, target) => {}
					}
				}
			]
		},
		Revenge: {
			img: '/static/white-lion/ai/basic/revenge.jpg',
			actions: [
				{
					type: 'pick',
					options: [
						lastToWoundInRange,
						closestThreatInFieldOfView,
						sniff
					]
				},
				{
					type: 'attack',
					move: true,
					speed: 2,
					accuracy: 2,
					damage: 2,
					trigger: {
						type: 'afterDamage',
						// TODO: Stub! Implement and remove BOTH of these comments
						// eslint-disable-next-line
						action: (boardState, target) => {}
					}
				}
			]
		},
		'Size Up': {
			img: '/static/white-lion/ai/basic/size-up.jpg',
			actions: [
				{
					type: 'pick',
					options: [
						randomThreatInFieldOfView,
						sniff
					]
				},
				{
					type: 'special',
					// TODO: Stub! Implement and remove BOTH of these comments
					// eslint-disable-next-line
					thunk: (nextAction) => (dispatch, getState) => {dispatch(nextAction);}
				}
			],
		},
		'Vicious Claw': {
			img: '/static/white-lion/ai/basic/vicious-claw.jpg',
			actions: [
				{
					type: 'pick',
					options: [
						randomInRange,
						sniff
					]
				},
				{
					type: 'attack',
					move: true,
					speed: 2,
					accuracy: 2,
					damage: 1,
					trigger: {
						type: 'afterDamage',
						// TODO: Stub! Implement and remove BOTH of these comments
						// eslint-disable-next-line
						action: (boardState, target) => {}
					}
				}
			],
			// TODO: Stub! Implement and remove BOTH of these comments
			// eslint-disable-next-line
			alternate: (boardState) => {
				return true;
			}
		}
	},
	advanced: {
		Alert: {
			img: '/static/white-lion/ai/advanced/alert.jpg',
			actions: [
				{
					type: 'mood',
					// TODO: Stub! Implement and remove BOTH of these comments
					// eslint-disable-next-line
					trigger: (boardState) => {}
				}
			]
		},
		'Blood Thirsty': {
			img: '/static/white-lion/ai/advanced/blood-thirsty.jpg',
			actions: [
				{
					type: 'mood',
					// TODO: Stub! Implement and remove BOTH of these comments
					// eslint-disable-next-line
					trigger: (boardState) => {}
				},
				{
					type: 'special',
					// TODO: Stub! Implement and remove BOTH of these comments
					// eslint-disable-next-line
					thunk: (nextAction) => (dispatch, getState) => {dispatch(nextAction);}
				}
			]
		},
		'Bloody Claw': {
			img: '/static/white-lion/ai/advanced/bloody-claw.jpg',
			actions: [
				{
					type: 'pick',
					options: [
						closestWithMostBleeding,
						sniff
					]
				},
				{
					type: 'attack',
					move: true,
					speed: 2,
					accuracy: 2,
					damage: 2,
					trigger: {
						type: 'afterDamage',
						// TODO: Stub! Implement and remove BOTH of these comments
						// eslint-disable-next-line
						action: (boardState, target) => {}
					}
				}
			],
			// TODO: Stub! Implement and remove BOTH of these comments
			// eslint-disable-next-line
			alternate: (boardState) => {
				return true;
			}
		},
		Enraged: {
			img: '/static/white-lion/ai/advanced/enraged.jpg',
			actions: [
				{
					type: 'mood',
					triggers: [
						{
							trigger: TRIGGERS.dismemberment,
							thunk: enragedTrigger
						},
						{
							trigger: TRIGGERS.playerKilled,
							thunk: enragedTrigger
						}
					]
				},
				{
					type: 'special',
					// TODO: Stub! Implement and remove BOTH of these comments
					// eslint-disable-next-line
					thunk: () => (dispatch, getState) => {
						dispatch(adjustMonsterStats({ damage: 1 }));
						dispatch(drawAICard());
						dispatch(changeBoardStatusAction(BOARD_STATUSES.processMonsterAction, { step: 0 })); // Note: this will kill any further action triggered by this card.
					}
				}
			]
		},
		'Ground Fighting': {
			img: '/static/white-lion/ai/advanced/ground-fighting.jpg',
			actions: [
				{
					type: 'mood',
					// TODO: Stub! Implement and remove BOTH of these comments
					// eslint-disable-next-line
					trigger: (boardState) => {}
				}
			]
		},
		'Lick Wounds': {
			img: '/static/white-lion/ai/advanced/lick-wounds.jpg',
			actions: [
				{
					type: 'special',
					// TODO: Stub! Implement and remove BOTH of these comments
					// eslint-disable-next-line
					thunk: (nextAction) => (dispatch, getState) => {dispatch(nextAction);}
				}
			]
		},
		Maul: {
			img: '/static/white-lion/ai/advanced/maul.jpg',
			actions: [
				{
					type: 'pick',
					options: [
						victimOfGrabLastRound,
						closestKnockedDownInRange,
						sniff
					]
				},
				{
					type: 'attack',
					move: true,
					speed: 2,
					accuracy: 2,
					damage: 3,
					trigger: {
						type: 'afterDamage',
						// TODO: Stub! Implement and remove BOTH of these comments
						// eslint-disable-next-line
						action: (boardState, target) => {}
					}
				}
			]
		},
		'Smart Cat': {
			img: '/static/white-lion/ai/advanced/smart-cat.jpg',
			actions: [
				{
					type: 'special',
					// TODO: Stub! Implement and remove BOTH of these comments
					// eslint-disable-next-line
					thunk: (nextAction) => (dispatch, getState) => {dispatch(nextAction);}
				}
			]
		},
		'Terrifying Roar': {
			img: '/static/white-lion/ai/advanced/terrifying-roar.jpg',
			actions: [
				{
					type: 'special',
					// TODO: Stub! Implement and remove BOTH of these comments
					// eslint-disable-next-line
					thunk: (nextAction) => (dispatch, getState) => {dispatch(nextAction);}
				}
			]
		}
	},
	legendary: {
		'Golden Eyes': {
			img: '/static/white-lion/ai/legendary/golden-eyes.jpg'
		},
		Vanish: {
			img: '/static/white-lion/ai/legendary/vanish.jpg'
		}
	},
	traits: {
		Cunning: {
			img: '/static/white-lion/ai/traits/cunning.jpg'
		},
		Merciless: {
			img: '/static/white-lion/ai/traits/merciless.jpg'
		}
	}
};

Object.assign = Object.assign || (() => ({})); //Removes an error on IE so we can display a nice error message
ai.cards = Object.assign({}, ai.basic, ai.advanced, ai.legendary, ai.traits);

ai.cards['Basic Action'] = {
	img: '/static/white-lion/basic-action.jpg',
	actions: [
		{
			type: 'pick',
			options: [
				closestInFieldOfView,
				sniff
			]
		},
		{
			type: 'attack',
			move: true,
			speed: 2,
			accuracy: 2,
			damage: 1
		}
	]
};
