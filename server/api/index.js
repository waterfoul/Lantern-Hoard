const express = require('express');

module.exports = new express.Router('api')
	.use('/auth', require('./auth'))
	.use('/room', require('./room'))
	.use('/character', require('./character'))
	.use('/', (req, res, next) => {
		res.sendStatus(404);
	});
