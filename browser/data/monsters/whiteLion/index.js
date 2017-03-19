import {ai} from './ai';
import {hl} from './hl';

export const whiteLion = {
	name: 'White Lion',
	aiBack: '/static/white-lion/ai/back.jpg',
	ai,
	hlBack: '/static/white-lion/hl/back.jpg',
	hl,
	basicAction: '/static/white-lion/basic-action.jpg',
	initialPlacements: []
};

const topY = 14;
const bottomY = 1;
const X1 = 10;
const X2 = 11;

for (let i = 0; i < 7; i++) {
	whiteLion.initialPlacements.push([X1 - i, topY - i]);
	whiteLion.initialPlacements.push([X2 + i, topY - i]);
	whiteLion.initialPlacements.push([X1 - i, bottomY + i]);
	whiteLion.initialPlacements.push([X2 + i, bottomY + i]);
}
