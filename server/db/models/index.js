'use strict';

const User = require('./user');
const OAuth = require('./oauth');
const Room = require('./room');
const Character = require('./character');

OAuth.belongsTo(User);
User.hasOne(OAuth);
