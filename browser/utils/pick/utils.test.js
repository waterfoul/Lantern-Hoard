'use strict';

import {isFront} from './utils';
import chai, {expect} from 'chai';
import chaiAsPromised from 'chai-as-promised';

chai.use(chaiAsPromised);

describe('utils/pick/utils', () => {
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
