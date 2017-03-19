function moveForward(boardState) {}
function jumpBack(boardState) {}

export const hl = {
	'Beasts Back': {
		img: '/static/white-lion/hl/beasts-back.jpg',
		triggers: [
			{
				type: 'failure',
				action: moveForward
			}
		],
		crit: (boardState) => {}
	},
	'Beasts Brow': {
		img: '/static/white-lion/hl/beasts-brow.jpg',
		triggers: [
			{
				type: 'wound',
				action: (boardState) => {}
			}
		],
		crit: (boardState) => {}
	},
	'Beasts Chest': {
		img: '/static/white-lion/hl/beasts-chest.jpg',
		triggers: [
			{
				type: 'failure',
				action: moveForward()
			}
		],
		crit: (boardState) => {}
	},
	'Beasts Ear': {
		img: '/static/white-lion/hl/beasts-ear.jpg',
		triggers: [
			{
				type: 'failure',
				action: jumpBack
			}
		],
		crit: (boardState) => {}
	},
	'Beasts Elbow': {
		img: '/static/white-lion/hl/beasts-elbow.jpg',
		triggers: [
			{
				type: 'failure',
				action: moveForward
			}
		],
		crit: (boardState) => {}
	},
	'Beasts Femur': {
		img: '/static/white-lion/hl/beasts-femur.jpg',
		crit: (boardState) => {}
	},
	'Beasts Flank': {
		img: '/static/white-lion/hl/beasts-flank.jpg',
		triggers: [
			{
				type: 'wound',
				action: (boardState) => {}
			}
		],
		crit: (boardState) => {}
	},
	'Beasts Heel': {
		img: '/static/white-lion/hl/beasts-heel.jpg',
		crit: (boardState) => {}
	},
	'Beasts Knee': {
		img: '/static/white-lion/hl/beasts-knee.jpg',
		crit: (boardState) => {}
	},
	'Beasts Maw': {
		img: '/static/white-lion/hl/beasts-maw.jpg',
		triggers: [
			{
				type: 'failure',
				action: (boardState) => {}
			}
		],
		crit: (boardState) => {}
	},
	'Beasts Paw': {
		img: '/static/white-lion/hl/beasts-paw.jpg',
		triggers: [
			{
				type: 'failure',
				action: (boardState) => {}
			}
		],
		crit: (boardState) => {}
	},
	'Beasts Ribs': {
		img: '/static/white-lion/hl/beasts-ribs.jpg',
		triggers: [
			{
				type: 'wound',
				action: (boardState) => {}
			}
		],
		crit: (boardState) => {}
	},
	'Beasts Scapular Deltoid': {
		img: '/static/white-lion/hl/beasts-scapular-deltoid.jpg',
		triggers: [
			{
				type: 'failure',
				action: moveForward
			}
		],
		crit: (boardState) => {}
	},
	'Beasts Tail': {
		img: '/static/white-lion/hl/beasts-tail.jpg',
		triggers: [
			{
				type: 'reflex',
				action: moveForward
			}
		],
		crit: (boardState) => {}
	},
	'Beasts Temple': {
		img: '/static/white-lion/hl/beasts-temple.jpg',
		triggers: [
			{
				type: 'failure',
				action: (boardState) => {}
			}
		],
		crit: (boardState) => {}
	},
	'Beasts Tricep': {
		img: '/static/white-lion/hl/beasts-tricep.jpg',
		triggers: [
			{
				type: 'failure',
				action: (boardState) => {}
			}
		],
		crit: (boardState) => {}
	},
	'Clever Ploy': {
		img: '/static/white-lion/hl/clever-ploy.jpg',
		trap: true,
		action: (boardState) => {}
	},
	'Fleshy Gut': {
		img: '/static/white-lion/hl/fleshy-gut.jpg',
		triggers: [
			{
				type: 'failure',
				action: (boardState) => {}
			}
		],
		crit: (boardState) => {}
	},
	'Fuzzy Groin': {
		img: '/static/white-lion/hl/fuzzy-groin.jpg',
		crit: (boardState) => {}
	},
	'Glorious Mane': {
		img: '/static/white-lion/hl/glorious-mane.jpg',
		impervious: true,
		crit: (boardState) => {}
	},
	'Soft Belly': {
		img: '/static/white-lion/hl/soft-belly.jpg',
		crit: (boardState) => {}
	},
	'Straining Neck': {
		img: '/static/white-lion/hl/straining-neck.jpg',
		crit: (boardState) => {}
	},
	'Strange Hand': {
		img: '/static/white-lion/hl/strange-hand.jpg',
		triggers: [
			{
				type: 'failure',
				action: (boardState) => {}
			}
		],
		crit: (boardState) => {}
	}
};
