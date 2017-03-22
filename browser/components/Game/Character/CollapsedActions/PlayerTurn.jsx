import React from 'react';
import {connect} from 'react-redux';
import {PleaseWait} from './PleaseWait';

export const PlayerTurn = connect(
	({auth, room}) => ({
		room,
		board: room.gameState.board,
		user: auth,
		playerResources: room.gameState.playerResources
	})
)(({slot, room, board, user, playerResources}) => {
	const character = room[`Character${slot + 1}`]; 
	if(slot === board.data && user.id === room[`Player${slot + 1}`].id ) {
		return (
			<div className="col-md-7 col-sm-12 attack-buttons container-fluid">
					<div className="col-md-6 col-sm-12">
						<button className="btn btn-primary btn-xs">Fist & Tooth</button>
					</div>
					<div className="col-md-6 col-sm-12">
						<button className="btn btn-primary btn-xs">Founding Stone</button>
					</div>
					<div className="col-md-6 col-sm-12">
						<button className="btn btn-primary btn-xs">Leather Headband</button>
					</div>
					<div className="col-md-6 col-sm-12">
						<button className="btn btn-primary btn-xs">Acid-Tooth Dagger</button>
					</div>
					<div className="col-md-6 col-sm-12">
						<button className="btn btn-primary btn-xs">Blue Charm</button>
					</div>
					<div className="col-md-6 col-sm-12">
						<button className="btn btn-primary btn-xs">Bone Axe</button>
					</div>
				</div> 
		);
	} else {
		return <PleaseWait />
	}
});
