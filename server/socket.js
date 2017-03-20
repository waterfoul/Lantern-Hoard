const sockjs = require('sockjs');
const logger = require('./utils/logger');
const Room = require('./db/models/room');
const {gameStateReducer} = require('../common/gameState')

// This holds the clients connected to each room
const rooms = {};
// This contains the update promises for each room, ensuring that only oen update is in progress for each room at a time
const roomUpdate = {};

const svr = sockjs.createServer({
	log: logger.log.bind(logger)
});

function removeFrom(client, room) {
	if (room !== -1) {
		rooms[room] = rooms[room] || [];
		rooms[room] = rooms[room].filter((ele) => ele !== client);
	}
}

svr.on('connection', function(conn) {
	let roomNum = -1;

	conn.on('data', function(message) {
		const data = JSON.parse(message);

		if (data.body === 'connect') {
			removeFrom(conn, roomNum);

			roomNum = data.room;

			rooms[roomNum] = rooms[roomNum] || [];
			rooms[roomNum].push(conn);
		} else if (roomNum === data.room) {
			rooms[roomNum] = rooms[roomNum] || [];

			rooms[roomNum].forEach((client) => {
				if (client !== conn) {
					client.write(message);
				}
			});

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
	});
});

module.exports = {
	svr: svr
};
