'use strict';

const User = require('./user');
const OAuth = require('./oauth');
const Room = require('./room');
const Character = require('./character');

OAuth.belongsTo(User);
User.hasOne(OAuth);

Room.belongsTo(User, {as: 'Player1'});
Room.belongsTo(User, {as: 'Player2'});
Room.belongsTo(User, {as: 'Player3'});
Room.belongsTo(User, {as: 'Player4'});

Room.belongsTo(Character, {as: 'Character1'});
Room.belongsTo(Character, {as: 'Character2'});
Room.belongsTo(Character, {as: 'Character3'});
Room.belongsTo(Character, {as: 'Character4'});
