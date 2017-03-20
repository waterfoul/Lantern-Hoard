import SockJS from 'sockjs-client';

import {store} from './store';

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
	const {room} = store.getState();

	if (room && data.room === room.id) {
		store.dispatch(Object.assign(data.body, {fromSocket: true}));
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
