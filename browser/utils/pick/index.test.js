'use strict';

import {closestThreatFacingInRange} from '.';
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
		describe('range/closest', () => {
			it('return null when all are out of range', () => {
				return expect(closestThreatFacingInRange(scenario, () => {})).to.eventually.equal(null);
			});

			it('finds the threat when others are not in range', () => {
				scenario.positions.player1 = [10, 6];

				return expect(closestThreatFacingInRange(scenario, () => {})).to.eventually.equal(0);
			});

			it('finds the threat when others are near', () => {
				scenario.positions.player2 = [10, 6];
				scenario.positions.player1 = [10, 5];

				return expect(closestThreatFacingInRange(scenario, () => {})).to.eventually.equal(1);
			});
		});

		describe('facing', () => {
			describe('North', () => {
				it('ignores targets who are not in front', () => {
					scenario.monsterDirection = 'N';
					scenario.positions.player1 = [9, 8];
					scenario.positions.player2 = [12, 7];
					scenario.positions.player3 = [11, 6];

					return expect(closestThreatFacingInRange(scenario, () => {})).to.eventually.equal(null);
				});
				it('catches targets who are in front', () => {
					scenario.monsterDirection = 'N';
					scenario.positions.player1 = [9, 8];
					scenario.positions.player2 = [12, 7];
					scenario.positions.player3 = [11, 6];
					scenario.positions.player4 = [10, 9];

					return expect(closestThreatFacingInRange(scenario, () => {})).to.eventually.equal(3);
				});
			});

			describe('South', () => {
				it('ignores targets who are not in front', () => {
					scenario.monsterDirection = 'S';
					scenario.positions.player1 = [9, 8];
					scenario.positions.player2 = [12, 7];
					scenario.positions.player3 = [10, 9];

					return expect(closestThreatFacingInRange(scenario, () => {})).to.eventually.equal(null);
				});
				it('catches targets who are in front', () => {
					scenario.monsterDirection = 'S';
					scenario.positions.player1 = [9, 8];
					scenario.positions.player2 = [12, 7];
					scenario.positions.player3 = [10, 9];
					scenario.positions.player4 = [11, 6];

					return expect(closestThreatFacingInRange(scenario, () => {})).to.eventually.equal(3);
				});
			});

			describe('East', () => {
				it('ignores targets who are not in front', () => {
					scenario.monsterDirection = 'E';
					scenario.positions.player1 = [9, 8];
					scenario.positions.player2 = [10, 9];
					scenario.positions.player3 = [11, 6];

					return expect(closestThreatFacingInRange(scenario, () => {})).to.eventually.equal(null);
				});
				it('catches targets who are in front', () => {
					scenario.monsterDirection = 'E';
					scenario.positions.player1 = [9, 8];
					scenario.positions.player2 = [10, 9];
					scenario.positions.player3 = [11, 6];
					scenario.positions.player4 = [12, 7];

					return expect(closestThreatFacingInRange(scenario, () => {})).to.eventually.equal(3);
				});
			});

			describe('West', () => {
				it('ignores targets who are not in front', () => {
					scenario.monsterDirection = 'W';
					scenario.positions.player1 = [10, 9];
					scenario.positions.player2 = [12, 7];
					scenario.positions.player3 = [11, 6];

					return expect(closestThreatFacingInRange(scenario, () => {})).to.eventually.equal(null);
				});
				it('catches targets who are in front', () => {
					scenario.monsterDirection = 'W';
					scenario.positions.player1 = [10, 9];
					scenario.positions.player2 = [12, 7];
					scenario.positions.player3 = [11, 6];
					scenario.positions.player4 = [9, 8];

					return expect(closestThreatFacingInRange(scenario, () => {})).to.eventually.equal(3);
				});
			});
		});
	});
});