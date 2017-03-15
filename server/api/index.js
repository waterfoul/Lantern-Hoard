const express = require('express');

module.exports = express.Router('api')
	.use('/', (req, res, next) => {
		res.sendStatus(404);
	});