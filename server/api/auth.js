const passport = require('passport');
const args = require('../utils/args');
const logger = require('../utils/logger');

const User = require('../db/models/user');
const OAuth = require('../db/models/oauth');
const express = require('express');

const auth = new express.Router();

OAuth.setupStrategy({
	provider: 'facebook',
	Strategy: require('passport-facebook').Strategy,
	config: {
		clientID: args.facebookClientId,
		clientSecret: args.facebookClientSecret,
		callbackURL: `${args.baseUrl}/api/auth/login/facebook`,
		profileFields: ['displayName', 'email'],
		scope: ['email']
	},
	passport
});

OAuth.setupStrategy({
	provider: 'google',
	Strategy: require('passport-google-oauth').OAuth2Strategy,
	config: {
		clientID: args.googleClientId,
		clientSecret: args.googleClientSecret,
		callbackURL: `${args.baseUrl}/api/auth/login/google`,
		scope: ['email']
	},
	passport
});

OAuth.setupStrategy({
	provider: 'github',
	Strategy: require('passport-github2').Strategy,
	config: {
		clientID: args.githubClientId,
		clientSecret: args.githubClientSecret,
		callbackURL: `${args.baseUrl}/api/auth/login/github`,
		scope: ['user:email']
	},
	passport
});

// Other passport configuration:
passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser(
	(id, done) => {
		logger.info('will deserialize user.id=%d', id);
		User.findById(id)
			.then((user) => {
				if (!user) logger.info('deserialize retrieved null user for id=%d', id);
				else logger.info('deserialize did ok user.id=%d', id);
				done(null, user);
			})
			.catch((err) => {
				logger.info('deserialize did fail err=%s', err);
				done(err);
			});
	}
);

auth.get('/whoami', (req, res) => res.send(req.user));

// GET requests for OAuth login:
// Register this route as a callback URL with OAuth provider
auth.get('/login/:strategy', (req, res, next) =>
	passport.authenticate(req.params.strategy, {
		successRedirect: '/'
	})(req, res, next)
);

auth.post('/logout', (req, res, next) => {
	req.logout();
	res.redirect('/api/auth/whoami');
});

module.exports = auth;
