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

export function sniff(boardState) {
	return Promise.resolve(null);
}

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
						action: (boardState, target, hits) => {}
					}
				}
			],
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
					action: (boardState) => {}
				}
			],
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
					action: (boardState, target) => {}
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
						action: (boardState, target) => {}
					}
				}
			],
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
					trigger: (boardState) => {}
				}
			]
		},
		'Blood Thirsty': {
			img: '/static/white-lion/ai/advanced/blood-thirsty.jpg',
			actions: [
				{
					type: 'mood',
					trigger: (boardState) => {}
				},
				{
					type: 'special',
					action: (boardState, target) => {}
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
						action: (boardState, target) => {}
					}
				}
			],
			alternate: (boardState) => {
				return true;
			}
		},
		Enraged: {
			img: '/static/white-lion/ai/advanced/enraged.jpg',
			actions: [
				{
					type: 'mood',
					trigger: (boardState) => {},
					persistant: {
						damage: 1
					}
				},
				{
					type: 'special',
					action: (boardState, target) => {}
				}
			]
		},
		'Ground Fighting': {
			img: '/static/white-lion/ai/advanced/ground-fighting.jpg',
			actions: [
				{
					type: 'mood',
					trigger: (boardState) => {}
				}
			]
		},
		'Lick Wounds': {
			img: '/static/white-lion/ai/advanced/lick-wounds.jpg',
			actions: [
				{
					type: 'special',
					action: (boardState, target) => {}
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
					action: (boardState, target) => {}
				}
			]
		},
		'Terrifying Roar': {
			img: '/static/white-lion/ai/advanced/terrifying-roar.jpg',
			actions: [
				{
					type: 'special',
					action: (boardState, target) => {}
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
