const express = require('express');
const Room = require('../db/models/room');
const User = require('../db/models/user');

module.exports = (new express.Router('api/room'))
	.get('/', (req, res, next) => (
		Room.findAll({
			attributes: {
				exclude: ['password', 'gameState']
			},
			include: [
				{ model: User, as: 'Player1' },
				{ model: User, as: 'Player2' },
				{ model: User, as: 'Player3' },
				{ model: User, as: 'Player4' }
			],
			order: 'name'
		})
			.then((rooms) => (rooms ? res.json(rooms) : res.sendStatus(404)))
			.catch(next)
	))
	.get('/:id', (req, res, next) => (
		Room.findById(
			req.params.id,
			{
				attributes: {
					exclude: ['password']
				},
				include: [
					{ model: User, as: 'Player1' },
					{ model: User, as: 'Player2' },
					{ model: User, as: 'Player3' },
					{ model: User, as: 'Player4' }
				]
			}
		)
			.then((room) => (room ? res.json(room) : res.sendStatus(404)))
			.catch(next)
	))
	.post('/', (req, res, next) => (
		Room.create(req.body)
			.then((room) => res.json(room).status(201))
			.catch(next)
	))
	.put('/:id', (req, res, next) => (
		Room.update(
			req.body,
			{where: {_id: req.params.id}}
		)
			.then((room) => res.json(room))
			.catch(next)
	))
	.delete('/:id', (req, res, next) => (
		Room.destroy({ where: { _id: req.params.id } })
			.then(() => res.sendStatus(204))
			.catch(next)
	))


	.post('/:id/join', (req, res, next) => (
		Room.findById(
			req.params.id,
			{ attributes: {
				exclude: ['password']
			} }
		)
			.then((room) => {
				if (!room.player1_id) {
					room.player1_id = req.user.id;
				} else if (!room.player2_id) {
					room.player2_id = req.user.id;
				} else if (!room.player3_id) {
					room.player3_id = req.user.id;
				} else if (!room.player4_id) {
					room.player4_id = req.user.id;
				}
				return room.save();
			})
			.then(() => res.sendStatus(204))
			.catch(next)
	))

	.post('/:id/takeControl/:slot', (req, res, next) => (
		Room.findById(
			req.params.id,
			{ attributes: {
				exclude: ['password']
			} }
		)
			.then((room) => {
				if (req.params.slot == 1) {
					room.player1_id = req.user.id;
				} else if (req.params.slot == 2) {
					room.player2_id = req.user.id;
				} else if (req.params.slot == 3) {
					room.player3_id = req.user.id;
				} else if (req.params.slot == 4) {
					room.player4_id = req.user.id;
				}
				return room.save();
			})
			.then(() => res.sendStatus(204))
			.catch(next)
	));
