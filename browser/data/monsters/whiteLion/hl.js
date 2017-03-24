import {moveMonster} from '../../../reducers/gameState/positions';

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
}
function jumpBack(dispatch, getState) {
	console.log('JUMP BACK!');
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
			console.log('CRIT!');
		}
	},
	'Beasts Brow': {
		img: '/static/white-lion/hl/beasts-brow.jpg',
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
			console.log('CRIT!');
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
			console.log('CRIT!');
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
			console.log('CRIT!');
		}
	},
	'Beasts Knee': {
		img: '/static/white-lion/hl/beasts-knee.jpg',
		crit: (dispatch, getState) => {
			console.log('CRIT!');
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
			console.log('CRIT!');
		}
	},
	'Beasts Paw': {
		img: '/static/white-lion/hl/beasts-paw.jpg',
		triggers: [
			{
				type: 'failure',
				action: (dispatch, getState) => {
					console.log('FAIL!');
				}
			}
		],
		crit: (dispatch, getState) => {
			console.log('CRIT!');
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
			console.log('CRIT!');
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
			console.log('CRIT!');
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
			console.log('CRIT!');
		}
	},
	'Beasts Temple': {
		img: '/static/white-lion/hl/beasts-temple.jpg',
		triggers: [
			{
				type: 'failure',
				action: (dispatch, getState) => {
					console.log('FAIL!');
				}
			}
		],
		crit: (dispatch, getState) => {
			console.log('CRIT!');
		}
	},
	'Beasts Tricep': {
		img: '/static/white-lion/hl/beasts-tricep.jpg',
		triggers: [
			{
				type: 'failure',
				action: (dispatch, getState) => {
					console.log('FAIL!');
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
			console.log('Clever Ploy!');
		}
	},
	'Fleshy Gut': {
		img: '/static/white-lion/hl/fleshy-gut.jpg',
		triggers: [
			{
				type: 'failure',
				action: (dispatch, getState) => {
					console.log('FAIL!');
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
			console.log('CRIT!');
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
			console.log('CRIT!');
		}
	},
	'Strange Hand': {
		img: '/static/white-lion/hl/strange-hand.jpg',
		triggers: [
			{
				type: 'failure',
				action: (dispatch, getState) => {
					console.log('FAIL!');
				}
			}
		],
		crit: (dispatch, getState) => {
			console.log('CRIT!');
		}
	}
};
