import SockJS from 'sockjs-client';

import {store} from './store';
import {fetch} from './reducers/room';
import {fetchList} from './reducers/roomList';

const sock = new SockJS('/socket');

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
	console.log('data', data);

	const {room, roomList} = store.getState();

	if (data.fullUpdate && roomList) {
		store.dispatch(fetchList());
	} else if (room && data.room === room.id) {
		if (data.update) {
			store.dispatch(fetch(room.id));
		} else {
			store.dispatch(Object.assign(data.body, {fromSocket: true}));
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
