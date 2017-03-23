import {boneSmith} from './boneSmith';
import {catarium} from './catarium';
import {leatherWorker} from './leatherWorker';
import {organGrinder} from './organGrinder';
import {skinnery} from './skinnery';
import {stoneCircle} from './stoneCircle';
import {weaponCrafter} from './weaponCrafter';

export const items = Object.assign(
	{
		Cloth: {
			value: 1,
			slot: ['waist'],
			descriptors: ['armor'],
			traits: [],
			specialAbilities: [],
			colorEdges: [null, null, null, null],
			characterModifiers: {},
			img: '/static/items/cloth.jpg'
		},
		'Founding Stone': {
			descriptors: ['weapon', 'melee', 'stone'],
			traits: [],
			dice: 2,
			accuracy: 7,
			strength: 1,
			np: {},
			specialAbilities: [
				{
					name: 'Sling',
					action: true,
					movement: false,
					cb: () => {}
				}
			],
			colorEdges: [null, null, null, null],
			characterModifiers: {},
			img: '/static/items/founding-stone.jpg'
		}
	},
	boneSmith,
	catarium,
	leatherWorker,
	organGrinder,
	skinnery,
	stoneCircle,
	weaponCrafter
);
