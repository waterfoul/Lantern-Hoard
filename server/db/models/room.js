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
		type: Sequelize.STRING
	}
});

module.exports = Room;

/*
Associated with between 1 and 4 users
Associated with 4 characters
White character association
Yellow character association
Green character association
Blue character association

Game State JSON
  - Deck states
  - Monster info
  - Stats
  - Name
  - Active Monster cards
  - Board positions
  - Armor values and injuries
  - Gear grid
*/
