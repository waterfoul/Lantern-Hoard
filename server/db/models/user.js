'use strict';

const Sequelize = require('sequelize');
const db = require('..');

const User = db.define('user', {
	name: Sequelize.STRING,
	email: {
		type: Sequelize.STRING,
		validate: {
			isEmail: true,
			notEmpty: true
		},
		unique: true
	},
}, {});

module.exports = User;
