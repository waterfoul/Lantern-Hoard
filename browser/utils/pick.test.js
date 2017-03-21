'use strict';

import {getDistance, isFront, closestThreatFacingInRange} from './pick';
import chai, {expect} from 'chai';
import chaiAsPromised from 'chai-as-promised';

chai.use(chaiAsPromised);

describe('utils/pick', () => {
	let scenario = null;

	beforeEach(() => {
		scenario = {
			monsterStats: {
				size: 2,
				range: 1,
				movement: 6
			},
			monsterDirection: 'S',
			positions: {
				monster: [10, 8],
				player1: [0, 0],
				player2: [0, 0],
				player3: [0, 0],
				player4: [0, 0]
			},
			threats: [true, true, true, true]
		};
	});

	describe('closestThreatFacingInRange', () => {
		it('return null when all are out of range', () => {
			return expect(closestThreatFacingInRange(scenario, () => {})).to.eventually.equal(null);
		});

		it('finds the threat when others are not in range', () => {
			scenario.positions.player1 = [9, 8];

			return expect(closestThreatFacingInRange(scenario, () => {})).to.eventually.equal(0);
		});

		it('finds the threat when others are near', () => {
			scenario.positions.player2 = [9, 8];
			scenario.positions.player1 = [7, 9];

			return expect(closestThreatFacingInRange(scenario, () => {})).to.eventually.equal(1);
		});

		describe('North', () => {
			it('ignores targets who are not in front', () => {
				scenario.monsterDirection = 'N';
				scenario.positions.player1 = [12, 8];
				scenario.positions.player2 = [9, 7];
				scenario.positions.player3 = [10, 6];

				return expect(closestThreatFacingInRange(scenario, () => {})).to.eventually.equal(null);
			});
			it('catches targets who are in front', () => {
				scenario.monsterDirection = 'N';
				scenario.positions.player1 = [12, 8];
				scenario.positions.player2 = [9, 7];
				scenario.positions.player3 = [10, 6];
				scenario.positions.player4 = [11, 9];

				return expect(closestThreatFacingInRange(scenario, () => {})).to.eventually.equal(3);
			});
		});
	});

	describe('getDistance', () => {
		describe('size 1', () => {
			it('calculates when above', () => {
				expect(getDistance(1, [10, 8], [10, 10])).to.equal(2);
			});

			it('calculates when to the left', () => {
				expect(getDistance(1, [10, 8], [8, 8])).to.equal(2);
			});

			it('calculates when below', () => {
				expect(getDistance(1, [10, 8], [10, 6])).to.equal(2);
			});

			it('calculates when to the right', () => {
				expect(getDistance(1, [10, 8], [12, 8])).to.equal(2);
			});

			it('calculates when top left', () => {
				expect(getDistance(1, [10, 8], [8, 10])).to.equal(4);
			});

			it('calculates when top right', () => {
				expect(getDistance(1, [10, 8], [12, 10])).to.equal(4);
			});

			it('calculates when bottom left', () => {
				expect(getDistance(1, [10, 8], [8, 6])).to.equal(4);
			});

			it('calculates when bottom right', () => {
				expect(getDistance(1, [10, 8], [12, 6])).to.equal(4);
			});
		});
		describe('size 2', () => {
			it('calculates when above', () => {
				expect(getDistance(2, [10, 8], [10, 10])).to.equal(2);
			});

			it('calculates when to the left', () => {
				expect(getDistance(2, [10, 8], [8, 8])).to.equal(2);
			});

			it('calculates when below', () => {
				expect(getDistance(2, [10, 8], [10, 6])).to.equal(1);
			});

			it('calculates when to the right', () => {
				expect(getDistance(2, [10, 8], [12, 8])).to.equal(1);
			});

			it('calculates when top left', () => {
				expect(getDistance(2, [10, 8], [8, 10])).to.equal(4);
			});

			it('calculates when top right', () => {
				expect(getDistance(2, [10, 8], [12, 10])).to.equal(3);
			});

			it('calculates when bottom left', () => {
				expect(getDistance(2, [10, 8], [8, 6])).to.equal(3);
			});

			it('calculates when bottom right', () => {
				expect(getDistance(2, [10, 8], [12, 6])).to.equal(2);
			});
		});
	});

	describe('isFront', () => {
		describe('Facing N', () => {
			it('is N', () => {
				expect(isFront('N', [10, 8], [11, 8])).to.equal(true);
			});
			it('is NE', () => {
				expect(isFront('N', [10, 8], [11, 9])).to.equal(true);
			});
			it('is E', () => {
				expect(isFront('N', [10, 8], [10, 9])).to.equal(false);
			});
			it('is SE', () => {
				expect(isFront('N', [10, 8], [9, 9])).to.equal(false);
			});
			it('is S', () => {
				expect(isFront('N', [10, 8], [9, 8])).to.equal(false);
			});
			it('is SW', () => {
				expect(isFront('N', [10, 8], [9, 7])).to.equal(false);
			});
			it('is W', () => {
				expect(isFront('N', [10, 8], [10, 7])).to.equal(false);
			});
			it('is NW', () => {
				expect(isFront('N', [10, 8], [11, 7])).to.equal(true);
			});
		});
		describe('Facing E', () => {
			it('is N', () => {
				expect(isFront('N', [10, 8], [11, 8])).to.equal(false);
			});
			it('is NE', () => {
				expect(isFront('N', [10, 8], [11, 9])).to.equal(true);
			});
			it('is E', () => {
				expect(isFront('N', [10, 8], [10, 9])).to.equal(true);
			});
			it('is SE', () => {
				expect(isFront('N', [10, 8], [9, 9])).to.equal(true);
			});
			it('is S', () => {
				expect(isFront('N', [10, 8], [9, 8])).to.equal(false);
			});
			it('is SW', () => {
				expect(isFront('N', [10, 8], [9, 7])).to.equal(false);
			});
			it('is W', () => {
				expect(isFront('N', [10, 8], [10, 7])).to.equal(false);
			});
			it('is NW', () => {
				expect(isFront('N', [10, 8], [11, 7])).to.equal(false);
			});
		});
		describe('Facing S', () => {
			it('is N', () => {
				expect(isFront('N', [10, 8], [11, 8])).to.equal(false);
			});
			it('is NE', () => {
				expect(isFront('N', [10, 8], [11, 9])).to.equal(false);
			});
			it('is E', () => {
				expect(isFront('N', [10, 8], [10, 9])).to.equal(false);
			});
			it('is SE', () => {
				expect(isFront('N', [10, 8], [9, 9])).to.equal(true);
			});
			it('is S', () => {
				expect(isFront('N', [10, 8], [9, 8])).to.equal(true);
			});
			it('is SW', () => {
				expect(isFront('N', [10, 8], [9, 7])).to.equal(true);
			});
			it('is W', () => {
				expect(isFront('N', [10, 8], [10, 7])).to.equal(false);
			});
			it('is NW', () => {
				expect(isFront('N', [10, 8], [11, 7])).to.equal(false);
			});
		});
		describe('Facing W', () => {
			it('is N', () => {
				expect(isFront('N', [10, 8], [11, 8])).to.equal(false);
			});
			it('is NE', () => {
				expect(isFront('N', [10, 8], [11, 9])).to.equal(false);
			});
			it('is E', () => {
				expect(isFront('N', [10, 8], [10, 9])).to.equal(false);
			});
			it('is SE', () => {
				expect(isFront('N', [10, 8], [9, 9])).to.equal(false);
			});
			it('is S', () => {
				expect(isFront('N', [10, 8], [9, 8])).to.equal(false);
			});
			it('is SW', () => {
				expect(isFront('N', [10, 8], [9, 7])).to.equal(true);
			});
			it('is W', () => {
				expect(isFront('N', [10, 8], [10, 7])).to.equal(true);
			});
			it('is NW', () => {
				expect(isFront('N', [10, 8], [11, 7])).to.equal(true);
			});
		});
	});
});
