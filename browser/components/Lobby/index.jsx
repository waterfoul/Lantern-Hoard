import React from 'react';
import { connect } from 'react-redux';

import { Room } from './Room';
import {CreateRoom} from './CreateRoom';
import { join } from '../../reducers/roomList';


export const Lobby = connect(
	({ roomList, auth }) => ({ roomList, user: auth }),
	{ joinEvt: join }
)(
	({ roomList, joinEvt, user }) => (
		<div>
			<CreateRoom user={user} />
			<div id="lobby-room-list" className="container-fluid">
				{roomList ? roomList.map((room) => (
					<div key={room.id} className="col-md-4">
						<Room room={room} user={user} join={joinEvt} />
					</div>
				)) : ''}
			</div>
		</div>
	)
);
