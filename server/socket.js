const sockjs = require('sockjs');
const logger = require('./utils/logger');
const Room = require('./db/models/room');
const {gameStateReducer} = require('../common/gameState');

// This holds the clients connected to each room
const rooms = {};
// This contains the update promises for each room, ensuring that only one update is in progress for each room at a time
const roomUpdate = {};

let allClients = [];

const svr = sockjs.createServer({
	log: logger.log.bind(logger)
});

function removeFrom(client, room) {
	if (room !== -1) {
		rooms[room] = rooms[room] || [];
		rooms[room] = rooms[room].filter((ele) => ele !== client);
	}
}

function sendTo(roomNum, message, excludedClient) {
	if (rooms[roomNum]) {
		rooms[roomNum].forEach((client) => {
			if (client !== excludedClient) {
				client.write(message);
			}
		});
	}
}

function sendAll(message) {
	logger.info('Broadcasting message to all clients', {message});
	allClients.forEach((client) => client.write(message));
}

svr.on('connection', function(conn) {
	let roomNum = -1;
	allClients.push(conn);

	conn.on('data', function(message) {
		const data = JSON.parse(message);

		if (data.body === 'connect') {
			removeFrom(conn, roomNum);

			roomNum = data.room;

			rooms[roomNum] = rooms[roomNum] || [];
			rooms[roomNum].push(conn);
		} else if (roomNum === data.room) {
			rooms[roomNum] = rooms[roomNum] || [];

			sendTo(roomNum, message, conn);

			const update = roomUpdate[roomNum] || Promise.resolve();

			roomUpdate[roomNum] = update.then(() => {
				return Room.findById(data.room).then((room) => {
					room.gameState = gameStateReducer(room.gameState, data.body);

					return room.save().then(() => roomUpdate[roomNum] = null);
				}).catch((e) => logger.error('Failed to update room via socket', data, e));
			});
		}
	});

	conn.on('close', function() {
		removeFrom(conn, roomNum);
		allClients = allClients.filter((ele) => ele !== conn);
	});
});

module.exports = {
	svr,
	sendTo,
	sendAll
};
