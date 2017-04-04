'use strict';

import { auth, authenticated, AUTHENTICATED } from './auth';
import { expect } from 'chai';

describe('browser/reducers/auth', () => {

	describe('authenticated', () => {
		it('creates the correct object', () => {
			const user = { email: 'test@a.com' };
			expect(authenticated(user)).to.deep.equal({
				type: AUTHENTICATED,
				user
			});
		});
	});

	describe('auth', () => {
		it('returns the user when authenticating', () => {
			const user = { email: 'test@a.com' };
			expect(auth(null, authenticated(user))).to.equal(user);
		});

		it('returns the previous state when not', () => {
			const notUser = { email: 'test@b.com' };
			expect(auth(notUser, {})).to.equal(notUser);
		});
	});
});
