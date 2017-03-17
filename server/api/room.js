const express = require('express');
const Room = require('../db/models/room');

module.exports = (new express.Router('api/room'))
	.get('/', (req, res, next) => (
		Room.findAll({
			attributes: {
				exclude: ['password']
			}
		})
			.then((rooms) => (rooms ? res.json(rooms) : res.sendStatus(404)))
			.catch(next)
	))
	.get('/:id', (req, res, next) => (
		Room.findById(
			req.params.id,
			{ attributes: {
				exclude: ['password']
			} }
		)
			.then((room) => (room ? res.json(room) : res.sendStatus(404)))
			.catch(next)
	))
	.post('/', (req, res, next) => {
		return Room.create(req.body)
			.then((room) => res.json(room).status(201))
			.catch(next);
	})
	.put('/:id', (req, res, next) => {
		return Room.update(
			req.body,
			{where: {_id: req.params.id}}
		)
			.then((room) => res.json(room))
			.catch(next);
	})
	.delete('/:id', (req, res, next) => (
		Room.destroy({ where: { _id: req.params.id } })
			.then(() => res.sendStatus(204))
			.catch(next)
	));
