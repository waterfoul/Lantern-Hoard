import React from 'react';
import { connect } from 'react-redux';

import { Room } from './Room';
import { CreateRoom } from './CreateRoom';
import { join, create } from '../../reducers/roomList';
import { GithubLink } from '../GithubLink';
import { Logout } from '../Logout';

export const Lobby = connect(
	({ roomList, auth }) => ({ roomList, user: auth }),
	{ joinEvt: join, createRoom: create }
)(
	({ roomList, createRoom, joinEvt, user }) => (
		<div id="lobby-wrapper">
			<CreateRoom user={user} createRoom={createRoom} />
			<div id="lobby-room-list" className="container-fluid">
				{roomList ? roomList.map((room) => (
					<div key={room.id} className="col-md-3">
						<Room room={room} user={user} join={joinEvt} />
					</div>
				)) : ''}
			</div>
			<Logout />
			<GithubLink />
		</div>
	)
);
