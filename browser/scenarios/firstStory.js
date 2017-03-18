import {shuffle} from '../utils/shuffle';
import {Hl} from '../data/white-lion/hl';

export function firstStory() {
	return {
		hl: {
			deck: [
				'Strange Hand',
				...shuffle(Object.keys(Hl).filter((ele) => (ele !== 'Strange Hand')))
			],
			discard: []
		},
		ai: {
			deck: [
				'Claw',
				...shuffle(['Chomp', 'Size Up', 'Power Swat', 'Grasp', 'Maul', 'Terrifying Roar', 'Enraged'])
			],
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
		positions: {
			monster: [10, 8],
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
