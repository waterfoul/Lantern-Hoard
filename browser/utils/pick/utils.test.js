'use strict';

import {isFront, checkFieldOfView} from './utils';
import chai, {expect} from 'chai';
import chaiAsPromised from 'chai-as-promised';

chai.use(chaiAsPromised);

describe('utils/pick/utils', () => {

	describe('checkFieldOfView', () => {
		const gameState = {
			positions: {
				monster: [10, 8]
			},
			monsterStats: {
				size: 2
			}
		};
		describe('monsterFacingNorth', () => {
			beforeEach(() => {
				gameState.monsterDirection = 'N';
			});
			it('has players to the left', () => {
				expect(checkFieldOfView(gameState, [9, 8])).to.equal(true);
				expect(checkFieldOfView(gameState, [6, 8])).to.equal(true);
				expect(checkFieldOfView(gameState, [5, 8])).to.equal(true);
				expect(checkFieldOfView(gameState, [9, 9])).to.equal(true);
				expect(checkFieldOfView(gameState, [9, 7])).to.equal(true);
			});
			it('has players to the right', () => {
				expect(checkFieldOfView(gameState, [12, 6])).to.equal(true);
				expect(checkFieldOfView(gameState, [14, 11])).to.equal(true);
				expect(checkFieldOfView(gameState, [12, 4])).to.equal(true);
				expect(checkFieldOfView(gameState, [13, 13])).to.equal(true);
				expect(checkFieldOfView(gameState, [16, 7])).to.equal(true);
			});
			it('has players above and below', () => {
				expect(checkFieldOfView(gameState, [10, 5])).to.equal(true);
				expect(checkFieldOfView(gameState, [10, 10])).to.equal(true);
				expect(checkFieldOfView(gameState, [11, 2])).to.equal(true);
				expect(checkFieldOfView(gameState, [9, 15])).to.equal(true);
				expect(checkFieldOfView(gameState, [10, 12])).to.equal(true);
			});
			it('has players in its blind spot', () => {
				expect(checkFieldOfView(gameState, [10, 6])).to.equal(false);
				expect(checkFieldOfView(gameState, [11, 6])).to.equal(false);
			});
		});
		describe('monsterFacingSouth', () => {
			beforeEach(() => {
				gameState.monsterDirection = 'S';
			});
			it('has players to the left', () => {
				expect(checkFieldOfView(gameState, [9, 8])).to.equal(true);
				expect(checkFieldOfView(gameState, [6, 8])).to.equal(true);
			});
			it('has players to the right', () => {
				expect(checkFieldOfView(gameState, [12, 6])).to.equal(true);
				expect(checkFieldOfView(gameState, [14, 11])).to.equal(true);
			});
			it('has players above and below', () => {
				expect(checkFieldOfView(gameState, [10, 5])).to.equal(true);
				expect(checkFieldOfView(gameState, [10, 14])).to.equal(true);
			});
			it('has players in its blind spot', () => {
				expect(checkFieldOfView(gameState, [10, 9])).to.equal(false);
				expect(checkFieldOfView(gameState, [11, 9])).to.equal(false);
			});
		});
		describe('monsterFacingEast', () => {
			beforeEach(() => {
				gameState.monsterDirection = 'E';
			});
			it('has players to the left', () => {
				expect(checkFieldOfView(gameState, [5, 8])).to.equal(true);
				expect(checkFieldOfView(gameState, [6, 8])).to.equal(true);
			});
			it('has players to the right', () => {
				expect(checkFieldOfView(gameState, [12, 6])).to.equal(true);
				expect(checkFieldOfView(gameState, [14, 11])).to.equal(true);
			});
			it('has players above and below', () => {
				expect(checkFieldOfView(gameState, [10, 5])).to.equal(true);
				expect(checkFieldOfView(gameState, [10, 14])).to.equal(true);
			});
			it('has players in its blind spot', () => {
				expect(checkFieldOfView(gameState, [9, 8])).to.equal(false);
				expect(checkFieldOfView(gameState, [9, 7])).to.equal(false);
			});
		});
		describe('monsterFacingWest', () => {
			beforeEach(() => {
				gameState.monsterDirection = 'W';
			});
			it('has players to the left', () => {
				expect(checkFieldOfView(gameState, [5, 8])).to.equal(true);
				expect(checkFieldOfView(gameState, [6, 8])).to.equal(true);
			});
			it('has players to the right', () => {
				expect(checkFieldOfView(gameState, [12, 6])).to.equal(true);
				expect(checkFieldOfView(gameState, [14, 11])).to.equal(true);
			});
			it('has players above and below', () => {
				expect(checkFieldOfView(gameState, [10, 5])).to.equal(true);
				expect(checkFieldOfView(gameState, [10, 14])).to.equal(true);
			});
			it('has players in its blind spot', () => {
				expect(checkFieldOfView(gameState, [12, 8])).to.equal(false);
				expect(checkFieldOfView(gameState, [12, 7])).to.equal(false);
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
});
