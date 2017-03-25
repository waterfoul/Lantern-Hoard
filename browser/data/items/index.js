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
			np: {},
			specialAbilities: [
				{
					name: 'Sling',
					action: true,
					movement: false,
					thunk: (slot, row, column) => (dispatch, getState) => {
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
