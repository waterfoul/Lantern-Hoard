import {
	closestThreatFacingInRange,
	closestThreatInFieldOfView,
	closestKnockedDownInRange,
	closestInRange,
	lastToWoundInRange,
	randomThreatInFieldOfView,
	randomInRange,
	victimOfGrabLastRound,
	closestWithMostBleeding
} from '../../utils/pick';

export function sniff(boardState) {
	return null;
}

export const ai = {
	back: '/static/white-lion/ai/back.jpg',
	basic: {
		'Bat Around': {
			img: '/static/white-lion/ai/bat-around.jpg',
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
			img: '/static/white-lion/ai/chomp.jpg',
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
			img: '/static/white-lion/ai/claw.jpg',
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
			img: '/static/white-lion/ai/combo-claw.jpg',
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
			img: '/static/white-lion/ai/grasp.jpg',
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
			img: '/static/white-lion/ai/power-swat.jpg',
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
			img: '/static/white-lion/ai/revenge.jpg',
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
			img: '/static/white-lion/ai/size-up.jpg',
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
			img: '/static/white-lion/ai/vicious-claw.jpg',
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
			img: '/static/white-lion/ai/alert.jpg',
			actions: [
				{
					type: 'mood',
					trigger: (boardState) => {}
				}
			]
		},
		'Blood Thirsty': {
			img: '/static/white-lion/ai/blood-thirsty.jpg',
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
			img: '/static/white-lion/ai/bloody-claw.jpg',
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
			img: '/static/white-lion/ai/enraged.jpg',
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
			img: '/static/white-lion/ai/ground-fighting.jpg',
			actions: [
				{
					type: 'mood',
					trigger: (boardState) => {}
				}
			]
		},
		'Lick Wounds': {
			img: '/static/white-lion/ai/lick-wounds.jpg',
			actions: [
				{
					type: 'special',
					action: (boardState, target) => {}
				}
			]
		},
		Maul: {
			img: '/static/white-lion/ai/maul.jpg',
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
			img: '/static/white-lion/ai/smart-cat.jpg',
			actions: [
				{
					type: 'special',
					action: (boardState, target) => {}
				}
			]
		},
		'Terrifying Roar': {
			img: '/static/white-lion/ai/terrifying-roar.jpg',
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
			img: '/static/white-lion/ai/golden-eyes.jpg'
		},
		Vanish: {
			img: '/static/white-lion/ai/vanish.jpg'
		}
	},
	traits: {
		Cunning: {
			img: '/static/white-lion/ai/cunning.jpg'
		},
		Merciless: {
			img: '/static/white-lion/ai/merciless.jpg'
		}
	}
};
