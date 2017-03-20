import React from 'react';
import {Link} from 'react-router-dom';

export const Room = ({room, user, join}) => {
	const inRoom = (
		(room.Player1 && room.Player1.id === user.id) ||
		(room.Player2 && room.Player2.id === user.id) ||
		(room.Player3 && room.Player3.id === user.id) ||
		(room.Player4 && room.Player4.id === user.id)
	);
	return (
		<div>
			<div className="lobby-room">
				<div>{room.name}</div>
				<div>
					{room.Player1 ? room.Player1.name : ''}
					{room.Player2 ? ', ' + room.Player2.name : ''}
					{room.Player3 ? (<span>,<br />{room.Player3.name}</span>) : ''}
					{room.Player4 ? ', ' + room.Player4.name : ''}
				</div>
				<div className="btn-group">
					<Link
						to={`/game/${room.id}`}
						className="btn btn-primary"
						disabled={room.Player4 && !inRoom}
						onClick={() => (!inRoom ? join(room.id) : null)}
					>
						Join
					</Link>
					<Link
						to={`/game/${room.id}`}
						disabled={inRoom}
						className="btn btn-secondary"
					>
						Watch
					</Link>
				</div>
			</div>
		</div>
	);
};
