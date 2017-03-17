import {shuffle} from '../utils/shuffle';

export function firstStory() {
	return {
		hl: {
			deck: ['Beasts Ear', ...shuffle(['Beasts Back', 'Beasts Brow'])],
			discard: []
		},
		ai: {
			deck: ['Alert', ...shuffle(['Bloodthirsty', 'Bloody Claw'])],
			discard: [],
			wound: []
		},
		effects: [],
		monsterName: 'White Lion',
		monsterStats: {
			size: 2,
			luck: 0,
			accuracy: 0,
			evasion: 0,
			speed: 0,
			damage: 0,
			toughness: 6,
			movement: 6
		},
		positons: {
			monster: [11, 9],
			player1: null,
			player2: null,
			player3: null,
			player4: null
		},
		armor: [
			{
				head: 0,
				body: 0,
				waist: 0,
				hand: 0,
				foot: 0
			},
			{
				head: 0,
				body: 0,
				waist: 0,
				hand: 0,
				foot: 0
			},
			{
				head: 0,
				body: 0,
				waist: 0,
				hand: 0,
				foot: 0
			},
			{
				head: 0,
				body: 0,
				waist: 0,
				hand: 0,
				foot: 0
			}
		],
		gear: [
			[
				['', '', ''],
				['', 'Cloth', 'Founding Stone'],
				['', '', '']
			],
			[
				['', '', ''],
				['', 'Cloth', 'Founding Stone'],
				['', '', '']
			],
			[
				['', '', ''],
				['', 'Cloth', 'Founding Stone'],
				['', '', '']
			]
		]
	};
}
