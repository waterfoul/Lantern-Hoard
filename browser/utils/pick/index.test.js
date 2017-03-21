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
		describe('directionality', () => {
			function describeDirection(direction) {
				it('is N', () => {
					expect(isFront(direction, 1, [10, 8], [10, 9])).to.equal(direction === 'N');
				});
				it('is NE', () => {
					expect(isFront(direction, 1, [10, 8], [11, 9])).to.equal(direction === 'N' || direction === 'E');
				});
				it('is E', () => {
					expect(isFront(direction, 1, [10, 8], [11, 8])).to.equal(direction === 'E');
				});
				it('is SE', () => {
					expect(isFront(direction, 1, [10, 8], [11, 7])).to.equal(direction === 'S' || direction === 'E');
				});
				it('is S', () => {
					expect(isFront(direction, 1, [10, 8], [10, 7])).to.equal(direction === 'S');
				});
				it('is SW', () => {
					expect(isFront(direction, 1, [10, 8], [9, 7])).to.equal(direction === 'S' || direction === 'W');
				});
				it('is W', () => {
					expect(isFront(direction, 1, [10, 8], [9, 8])).to.equal(direction === 'W');
				});
				it('is NW', () => {
					expect(isFront(direction, 1, [10, 8], [9, 9])).to.equal(direction === 'N' || direction === 'W');
				});
			}
			describe('Facing N', () => {
				describeDirection('N');
			});
			describe('Facing E', () => {
				describeDirection('E');
			});
			describe('Facing S', () => {
				describeDirection('S');
			});
			describe('Facing W', () => {
				describeDirection('W');
			});
		});
		describe('size', () => {
			describe('standard locations', () => {
				it('is N', () => {
					expect(isFront('N', 2, [10, 8], [10, 9])).to.equal(true);
					expect(isFront('S', 2, [10, 8], [10, 9])).to.equal(false);
					expect(isFront('E', 2, [10, 8], [10, 9])).to.equal(false);
					expect(isFront('W', 2, [10, 8], [10, 9])).to.equal(false);
				});
				it('is E', () => {
					expect(isFront('N', 2, [10, 8], [12, 8])).to.equal(false);
					expect(isFront('S', 2, [10, 8], [12, 8])).to.equal(false);
					expect(isFront('E', 2, [10, 8], [12, 8])).to.equal(true);
					expect(isFront('W', 2, [10, 8], [12, 8])).to.equal(false);
				});
				it('is W', () => {
					expect(isFront('N', 2, [10, 8], [9, 8])).to.equal(false);
					expect(isFront('S', 2, [10, 8], [9, 8])).to.equal(false);
					expect(isFront('E', 2, [10, 8], [9, 8])).to.equal(false);
					expect(isFront('W', 2, [10, 8], [9, 8])).to.equal(true);
				});
				it('is S', () => {
					expect(isFront('N', 2, [10, 8], [10, 6])).to.equal(false);
					expect(isFront('S', 2, [10, 8], [10, 6])).to.equal(true);
					expect(isFront('E', 2, [10, 8], [10, 6])).to.equal(false);
					expect(isFront('W', 2, [10, 8], [10, 6])).to.equal(false);
				});
			});
		});
		describe('changed locations', () => {
			it('was SE', () => {
				expect(isFront('N', 2, [10, 8], [12, 7])).to.equal(false);
				expect(isFront('S', 2, [10, 8], [12, 7])).to.equal(false);
				expect(isFront('E', 2, [10, 8], [12, 7])).to.equal(true);
				expect(isFront('W', 2, [10, 8], [12, 7])).to.equal(false);
			});
			it('was SW', () => {
				expect(isFront('N', 2, [10, 8], [9, 7])).to.equal(false);
				expect(isFront('S', 2, [10, 8], [9, 7])).to.equal(false);
				expect(isFront('E', 2, [10, 8], [9, 7])).to.equal(false);
				expect(isFront('W', 2, [10, 8], [9, 7])).to.equal(true);
			});
		});
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
