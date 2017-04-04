'use strict';
const debugSQL = require('debug')('sql'); // DEBUG=sql
const chalk = require('chalk');
const Sequelize = require('sequelize');
const logger = require('../utils/logger');

const name = (process.env.DATABASE_NAME || 'lantern-hoard');

const url = process.env.DATABASE_URL || `postgres://localhost:5432/${name}`;

logger.info(chalk.yellow(`Opening database connection to ${url}`));

// create the database instance
const db = module.exports = new Sequelize(url, {
	logging: debugSQL, // export DEBUG=sql in the environment to get SQL queries
	define: {
		underscored: true,       // use snake_case rather than camelCase column names
		freezeTableName: true,   // don't change table names from the one specified
		timestamps: true,        // automatically include timestamp columns
	}
});

// pull in our models
require('./models');

// sync the db, creating it if necessary
function sync(force = false, retries = 0, maxRetries = 5) {
	return db.sync({ force })
		.then(() => logger.info(`Synced models to db ${url}`))
		.catch((fail) => {
			// Don't do this auto-create nonsense if we've retried too many times.
			if (retries > maxRetries) {
				console.error(chalk.red(`********** database error ***********`));
				console.error(chalk.red(`    Couldn't connect to ${url}`));
				console.error();
				console.error(chalk.red(fail));
				console.error(chalk.red(`*************************************`));
				return;
			}
			// Otherwise, do this autocreate nonsense
			logger.info(`${retries ? `[retry ${retries}]` : ''} Creating database ${name}...`);
			return new Promise((resolve, reject) =>
				// 'child_process.exec' docs: https://nodejs.org/api/child_process.html#child_process_child_process_exec_command_options_callback
				require('child_process').exec(`createdb "${name}"`, (err) => {
					if (err) {
						reject(err);
					} else {
						resolve();
					}
				})
			).then(() => sync(true, retries + 1));
		});
}

// Note that db.didSync is a promise, rather than returning a promise
db.didSync = sync();
