const Sequelize = require('sequelize');
const db = require('../index.js');

const Room = db.define('room', {
	name: {
		type: Sequelize.STRING,
		allowNull: false,
		unique: true,
		validate: {
			notEmpty: true
		},
	},
	password: {
		type: Sequelize.STRING,
	},
	gameState: {
		type: Sequelize.JSON,
		allowNull: false
	}
});

module.exports = Room;
