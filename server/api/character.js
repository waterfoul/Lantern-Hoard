const express = require('express');
const Room = require('../db/models/room');
const Character = require('../db/models/character');
const { sendTo } = require('../socket');

module.exports = (new express.Router('api/character'))
	.get('/:id', (req, res, next) => {
		Character.findById(req.params.id)
			.then((character) => (character ? res.json(character) : res.sendStatus(404)))
			.catch(next);
	})
	.put('/:id', (req, res, next) => {
		Character.update(req.body, {
			where: {
				id: req.params.id
			}
		})
			.then((character) => {
				return Room.findAll({
					where: {
						$or: [{
							character1_id: req.params.id
						}, {
							character2_id: req.params.id
						}, {
							character3_id: req.params.id
						}, {
							character4_id: req.params.id
						}]
					}
				})
					.then((rooms) => {
						rooms.forEach((room) => {
							sendTo(room.id, JSON.stringify({
								room: room.id,
								update: true
							}));
						});
					})
					.then(() => (character ? res.sendStatus(204) : res.sendStatus(404)));
			})
			.catch(next);
	});
