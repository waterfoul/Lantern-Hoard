'use strict';

const User = require('./user');
const OAuth = require('./oauth');

OAuth.belongsTo(User);
User.hasOne(OAuth);
