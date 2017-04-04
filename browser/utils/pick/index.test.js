'use strict';

import {
	closestThreatFacingInRange,
	closestInRange,
	closestKnockedDownInRange
} from '.';
import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { STATUSES } from '../../../common/gameState/knockedDownCharacters';

chai.use(chaiAsPromised);

describe('utils/pick', () => {
	let scenario = null;

	beforeEach(() => {
		scenario = {
			room: {
				Character1: { dead: false },
				Character2: { dead: false },
				Character3: { dead: false },
				Character4: { dead: false },
				gameState: {
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
					knockedDownCharacters: [STATUSES.standing, STATUSES.standing, STATUSES.standing, STATUSES.standing],
					threats: [true, true, true, true]
				}
			}
		};
	});

	describe('closestThreatFacingInRange', () => {
		describe('range/closest', () => {
			it('return null when all are out of range', () => {
				return expect(closestThreatFacingInRange(() => scenario, () => { })).to.eventually.equal(null);
			});

			it('finds the threat when others are not in range', () => {
				scenario.room.gameState.positions.player1 = [10, 6];

				return expect(closestThreatFacingInRange(() => scenario, () => { })).to.eventually.equal(0);
			});

			it('finds the threat when others are near', () => {
				scenario.room.gameState.positions.player2 = [10, 6];
				scenario.room.gameState.positions.player1 = [10, 5];

				return expect(closestThreatFacingInRange(() => scenario, () => { })).to.eventually.equal(1);
			});
		});

		describe('facing', () => {
			describe('North', () => {
				it('ignores targets who are not in front', () => {
					scenario.room.gameState.monsterDirection = 'N';
					scenario.room.gameState.positions.player1 = [9, 8];
					scenario.room.gameState.positions.player2 = [12, 7];
					scenario.room.gameState.positions.player3 = [11, 6];

					return expect(closestThreatFacingInRange(() => scenario, () => { })).to.eventually.equal(null);
				});
				it('catches targets who are in front', () => {
					scenario.room.gameState.monsterDirection = 'N';
					scenario.room.gameState.positions.player1 = [9, 8];
					scenario.room.gameState.positions.player2 = [12, 7];
					scenario.room.gameState.positions.player3 = [11, 6];
					scenario.room.gameState.positions.player4 = [10, 9];

					return expect(closestThreatFacingInRange(() => scenario, () => { })).to.eventually.equal(3);
				});
			});

			describe('South', () => {
				it('ignores targets who are not in front', () => {
					scenario.room.gameState.monsterDirection = 'S';
					scenario.room.gameState.positions.player1 = [9, 8];
					scenario.room.gameState.positions.player2 = [12, 7];
					scenario.room.gameState.positions.player3 = [10, 9];

					return expect(closestThreatFacingInRange(() => scenario, () => { })).to.eventually.equal(null);
				});
				it('catches targets who are in front', () => {
					scenario.room.gameState.monsterDirection = 'S';
					scenario.room.gameState.positions.player1 = [9, 8];
					scenario.room.gameState.positions.player2 = [12, 7];
					scenario.room.gameState.positions.player3 = [10, 9];
					scenario.room.gameState.positions.player4 = [11, 6];

					return expect(closestThreatFacingInRange(() => scenario, () => { })).to.eventually.equal(3);
				});
			});

			describe('East', () => {
				it('ignores targets who are not in front', () => {
					scenario.room.gameState.monsterDirection = 'E';
					scenario.room.gameState.positions.player1 = [9, 8];
					scenario.room.gameState.positions.player2 = [10, 9];
					scenario.room.gameState.positions.player3 = [11, 6];

					return expect(closestThreatFacingInRange(() => scenario, () => { })).to.eventually.equal(null);
				});
				it('catches targets who are in front', () => {
					scenario.room.gameState.monsterDirection = 'E';
					scenario.room.gameState.positions.player1 = [9, 8];
					scenario.room.gameState.positions.player2 = [10, 9];
					scenario.room.gameState.positions.player3 = [11, 6];
					scenario.room.gameState.positions.player4 = [12, 7];

					return expect(closestThreatFacingInRange(() => scenario, () => { })).to.eventually.equal(3);
				});
			});

			describe('West', () => {
				it('ignores targets who are not in front', () => {
					scenario.room.gameState.monsterDirection = 'W';
					scenario.room.gameState.positions.player1 = [10, 9];
					scenario.room.gameState.positions.player2 = [12, 7];
					scenario.room.gameState.positions.player3 = [11, 6];

					return expect(closestThreatFacingInRange(() => scenario, () => { })).to.eventually.equal(null);
				});
				it('catches targets who are in front', () => {
					scenario.room.gameState.monsterDirection = 'W';
					scenario.room.gameState.positions.player1 = [10, 9];
					scenario.room.gameState.positions.player2 = [12, 7];
					scenario.room.gameState.positions.player3 = [11, 6];
					scenario.room.gameState.positions.player4 = [9, 8];

					return expect(closestThreatFacingInRange(() => scenario, () => { })).to.eventually.equal(3);
				});
			});
		});
	});
	describe('closestInRange', () => {
		describe('range/closest', () => {
			it('return null when all are out of range', () => {
				return expect(closestInRange(() => scenario, () => { })).to.eventually.equal(null);
			});

			it('finds closest player when near', () => {
				scenario.room.gameState.positions.player2 = [10, 6];
				scenario.room.gameState.positions.player3 = [100, 6];
				scenario.room.gameState.positions.player1 = [10, 5];

				return expect(closestThreatFacingInRange(() => scenario, () => { })).to.eventually.equal(1);
			});
			it('works with multiple players in range', () => {
				scenario.room.gameState.positions.player2 = [10, 6];
				scenario.room.gameState.positions.player3 = [100, 6];
				scenario.room.gameState.positions.player1 = [10, 5];
				scenario.room.gameState.positions.player4 = [10, 5];

				return expect(closestThreatFacingInRange(() => scenario, () => { })).to.eventually.equal(1);
			});
		});
	});
	describe('closestKnockedDownInRange', () => {
		describe('knocked down', () => {
			it('return null none has knocked down status', () => {
				return expect(closestKnockedDownInRange(() => scenario, () => { })).to.eventually.equal(null);
			});
			it('finds those who are knocked down and in range', () => {
				scenario.room.gameState.knockedDownCharacters[0] = 'KNOCKED_DOWN';
				scenario.room.gameState.knockedDownCharacters[1] = 'STANDING';
				scenario.room.gameState.positions.player1 = [10, 6];
				scenario.room.gameState.positions.player2 = [11, 6];
				return expect(closestKnockedDownInRange(() => scenario, () => { })).to.eventually.equal(0);
			});
			it('does not find not knocked down and in range', () => {
				scenario.room.gameState.knockedDownCharacters[0] = 'STANDING';
				scenario.room.gameState.knockedDownCharacters[1] = 'STANDING';
				scenario.room.gameState.positions.player1 = [10, 6];
				scenario.room.gameState.positions.player2 = [11, 6];
				return expect(closestKnockedDownInRange(() => scenario, () => { })).to.eventually.equal(null);
			});
			it('finds those who are knocked down and not in range', () => {
				scenario.room.gameState.knockedDownCharacters[0] = 'KNOCKED_DOWN';
				scenario.room.gameState.knockedDownCharacters[1] = 'STANDING';
				scenario.room.gameState.positions.player1 = [0, 0];
				scenario.room.gameState.positions.player2 = [11, 6];
				return expect(closestKnockedDownInRange(() => scenario, () => { })).to.eventually.equal(null);
			});
		});
	});
});
