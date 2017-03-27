const Sequelize = require('sequelize');
const db = require('../index.js');

const Character = db.define('character', {
	name: {
		type: Sequelize.STRING,
		allowNull: false,
		defaultValue: 'Unnamed Survivor',
		validate: {
			notEmpty: true
		}
	},
	xp: {
		type: Sequelize.INTEGER,
		allowNull: false,
		defaultValue: 0
	},
	modifierCards: {
		type: Sequelize.STRING,
		allowNull: false,
		defaultValue: '',
		get: function () { return this.getDataValue('modifierCards').split('\x11'); },
		set: function (val) { this.setDataValue('modifierCards', val.join('\x11')); }
	},
	movement: {
		type: Sequelize.INTEGER,
		allowNull: false,
		defaultValue: 5
	},
	accuracy: {
		type: Sequelize.INTEGER,
		allowNull: false,
		defaultValue: 0
	},
	strength: {
		type: Sequelize.INTEGER,
		allowNull: false,
		defaultValue: 0
	},
	evasion: {
		type: Sequelize.INTEGER,
		allowNull: false,
		defaultValue: 0
	},
	luck: {
		type: Sequelize.INTEGER,
		allowNull: false,
		defaultValue: 0
	},
	speed: {
		type: Sequelize.INTEGER,
		allowNull: false,
		defaultValue: 0
	},
	survivalLimit: {
		type: Sequelize.INTEGER,
		allowNull: false,
		defaultValue: 1
	},
	survivalAmount: {
		type: Sequelize.INTEGER,
		allowNull: false,
		defaultValue: 1
	},
	survivalSkillDodge: {
		type: Sequelize.BOOLEAN,
		allowNull: false,
		defaultValue: true
	},
	survivalSkillEncourage: {
		type: Sequelize.BOOLEAN,
		allowNull: false,
		defaultValue: false
	},
	survivalSkillSurge: {
		type: Sequelize.BOOLEAN,
		allowNull: false,
		defaultValue: false
	},
	survivalSkillDash: {
		type: Sequelize.BOOLEAN,
		allowNull: false,
		defaultValue: false
	},
	insanity: {
		type: Sequelize.INTEGER,
		allowNull: false,
		defaultValue: 0
	},
	brainInjury: {
		type: Sequelize.BOOLEAN,
		allowNull: false,
		defaultValue: false
	},
	courage: {
		type: Sequelize.INTEGER,
		allowNull: false,
		defaultValue: 0
	},
	courageSkills: {
		type: Sequelize.ENUM('Stalwart', 'Prepared', 'Matchmaker')
	},
	understanding: {
		type: Sequelize.INTEGER,
		allowNull: false,
		defaultValue: 0
	},
	understandingSkill: {
		type: Sequelize.ENUM('Analyze', 'Explore', 'Tinker')
	},
	weaponProficiency: {
		type: Sequelize.ENUM('Axe', 'Bow', 'Club', 'Dagger', 'Fist & Tooth', 'Grand', 'Katar', 'Shield', 'Spear', 'Sword', 'Twilight Sword', 'Whip')
	},
	weaponProficiencyLevel: {
		type: Sequelize.INTEGER,
		allowNull: false,
		defaultValue: 0
	},
	dead: {
		type: Sequelize.BOOLEAN,
		allowNull: false,
		defaultValue: false
	}
});

// Associated to User

module.exports = Character;
