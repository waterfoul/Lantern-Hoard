const express = require('express');
const Room = require('../db/models/room');
const Character = require('../db/models/character');
const User = require('../db/models/user');
const {sendTo, sendAll} = require('../socket');

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
						character1_id: character.id,
						character2_id: character.id,
						character3_id: character.id,
						character4_id: character.id,
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
