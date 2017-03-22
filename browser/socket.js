import SockJS from 'sockjs-client';

import {store} from './store';
import {fetch} from './reducers/room';
import {fetchList} from './reducers/roomList';
import {BOARD_STATUSES} from '../common/gameState/board';
import {checkGameState} from './reducers/room';

// If we are in node, skip socket init cause we are probably testing and it breaks things
const sock = (global.process && global.process.title) ? {} : new SockJS('/socket');

let connect = null;

function reconnect() {
	connect = new Promise((resolve) => {
		sock.onopen = function () {
			resolve();
		};
	});
}
reconnect();

sock.onmessage = function(e) {
	const data = JSON.parse(e.data);

	const {room, roomList} = store.getState();

	if (data.fullUpdate && roomList) {
		store.dispatch(fetchList());
	} else if (room && data.room === room.id) {
		if (data.update) {
			store.dispatch(fetch(room.id));
		} else {
			store.dispatch(Object.assign(data.body, {fromSocket: true}));

			if (room.gameState.board.status === BOARD_STATUSES.initialPlacement) {
				store.dispatch(checkGameState());
			}
		}
	}
};

sock.onclose = function() {
	reconnect();
};

export function send(body) {
	return connect.then(() => {
		const {room} = store.getState();
		if (room) {
			sock.send(JSON.stringify({
				room: room.id,
				body
			}));
		}
	});
}

send('connect');
