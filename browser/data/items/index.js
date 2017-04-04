import {boneSmith} from './boneSmith';
import {catarium} from './catarium';
import {leatherWorker} from './leatherWorker';
import {organGrinder} from './organGrinder';
import {skinnery} from './skinnery';
import {stoneCircle} from './stoneCircle';
import {weaponCrafter} from './weaponCrafter';
import {startAttack} from '../../reducers/gameState/playerTurn';
import {archiveItem} from '../../../common/gameState/gear';

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
			diceMods: {},
			specialAbilities: [
				{
					name: 'Sling',
					action: true,
					movement: false,
					range: 999,
					thunk: (slot, row, column) => (dispatch) => {
						dispatch(startAttack(slot, 'Founding Stone', 1, 0, 1, {
							dice: 1,
							range: 999
						}));
						dispatch(archiveItem(slot, row, column));
					}
				}
			],
			colorEdges: [null, null, null, null],
			characterModifiers: {},
			img: '/static/items/founding-stone.jpg'
		},
		'Fist & Tooth': {
			descriptors: ['weapon', 'melee'],
			traits: [],
			dice: 2,
			accuracy: 8,
			strength: 0,
			diceMods: {
				luck: 1
			},
			specialAbilities: [],
			colorEdges: [null, null, null, null],
			characterModifiers: {},
			img: '/static/items/fist-and-tooth.jpg'
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
