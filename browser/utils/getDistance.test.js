'use strict';

import { getDistance } from './getDistance';
import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';

chai.use(chaiAsPromised);

describe('utils/getDistance', () => {
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
});
