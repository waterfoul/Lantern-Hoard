const logger = require('./utils/logger');
const express = require('express');
const expressWinston = require('express-winston');
const winston = require('winston');
const passport = require('passport');
const bodyParser = require('body-parser');
const {resolve} = require('path');
const args = require('./utils/args');

const app = express()

	.use(expressWinston.logger({
		transports: [
			new winston.transports.Console({
				prettyPrint: true,
				colorize: true,
				timestamp: true,
				level: args.verbose >= 1 ? 'info' : 'warn'
			})
		],
		meta: false, // optional: control whether you want to log the meta data about the request (default to true)
		expressFormat: true, // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
		colorize: true, // Color the text and status code, using the Express/morgan color palette (text: gray, status: default green, 3XX cyan, 4XX yellow, 5XX red).
		ignoreRoute: function (req, res) { return false; } // optional: allows to skip some log messages based on request and/or response
	}))

	.use(require('cookie-session')({
		name: 'session',
		keys: [process.env.SESSION_SECRET || 'an insecure secret key']
	}))

	// Body parsing middleware
	.use(bodyParser.urlencoded({ extended: true }))
	.use(bodyParser.json())

	// Authentication middleware
	.use(passport.initialize())
	.use(passport.session())

	.use('/static', express.static(resolve(__dirname, '..', 'browser', 'static')))

	.use('/api', require('./api'))

	.get('/*', (_, res) => res.sendFile(resolve(__dirname, '..', 'browser', 'index.html')))

	.use((err, req, res, next) => {
		res.sendStatus(500);
		logger.error(err);
	});

const server = app.listen(args.port, () => {
	const { address, port } = server.address();
	const host = address === '::' ? 'localhost' : address;
	const urlSafeHost = host.includes(':') ? `[${host}]` : host;
	logger.info(`Listening on http://${urlSafeHost}:${port}`);
});
