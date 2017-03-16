import React from 'react';
import { connect } from 'react-redux';

import { Room } from './Room';


export const Lobby = connect(
	({ auth }) => ({ user: auth })
)(
	({ user }) => (
		<div>
			<div id="lobby-room-list" className="container-fluid">
				<div className="col-md-4">
					<Room />
				</div>
				<div className="col-md-4">
					<Room />
				</div>
				<div className="col-md-4">
					<Room />
				</div>
				<div className="col-md-4">
					<Room />
				</div>
			</div>
		</div>
	)
	);
