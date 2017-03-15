const express = require('express');

module.exports = new express.Router('api')
	.use('/', (req, res, next) => {
		res.sendStatus(404);
	});
