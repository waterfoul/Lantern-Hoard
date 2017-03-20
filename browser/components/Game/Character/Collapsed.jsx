import React from 'react';
import {connect} from 'react-redux';

import {takeControl} from '../../../reducers/room';
import {BOARD_STATUSES} from '../../../../common/gameState/board';

export const Collapsed = connect(
	({ room, boardError, auth }) => ({
		armor: room.gameState.armor,
		board: room.gameState.board || {},
		room: room,
		positions: room.gameState.positions,
		user: auth,
		boardError
	}),
	{takeControlEvt: takeControl}
)(({ armor, slot, room, board, positions, user, boardError, takeControlEvt }) => {
	const getPlacementText = () => {
		const placingPlayer = (!positions.player1 ? 0 : (!positions.player2 ? 1 : (!positions.player3 ? 2 : 3)));
		if (placingPlayer === slot && room[`Player${slot + 1}`].id === user.id) {
			return 'Place Me on the Board';
		} else {
			return 'Please Wait...';
		}
	};

	return (
		<div>
			<div className="game-character-collapsed container-fluid">
				<div className="col-md-5 col-sm-12">
					<div>Character Name</div>
					<div>{ room[`Player${slot + 1}`] ? room[`Player${slot + 1}`].name : 'Open' }</div>
					<div>
						<i className="glyphicon glyphicon-screenshot" />&nbsp;
						<span>
						{0}
							&nbsp;/&nbsp;
							{0}
							&nbsp;/&nbsp;
							{0}
							&nbsp;/&nbsp;
							{0}
							&nbsp;/&nbsp;
							{0}
							&nbsp;/&nbsp;
							{0}
					</span>
					</div>
					<div>
						<i className="glyphicon glyphicon-heart" />&nbsp;
						<span>
						{armor[slot].head}
							&nbsp;/&nbsp;
							{armor[slot].body}
							&nbsp;/&nbsp;
							{armor[slot].waist}
							&nbsp;/&nbsp;
							{armor[slot].hand}
							&nbsp;/&nbsp;
							{armor[slot].foot}
					</span>
					</div>
				</div>
				{ room[`Player${slot + 1}`] ?
					(
						board.status === BOARD_STATUSES.initialPlacement ? (
								<div className="col-md-7 col-sm-12">
									{getPlacementText()}
								</div>
							) : (
								<div className="col-md-7 col-sm-12 attack-buttons container-fluid">
									<div className="col-md-6 col-sm-12"><button className="btn btn-primary btn-xs" disabled={boardError}>Fist & Tooth</button></div>
									<div className="col-md-6 col-sm-12"><button className="btn btn-primary btn-xs" disabled={boardError}>Founding Stone</button></div>
									<div className="col-md-6 col-sm-12"><button className="btn btn-primary btn-xs" disabled={boardError}>Leather Headband</button></div>
									<div className="col-md-6 col-sm-12"><button className="btn btn-primary btn-xs" disabled={boardError}>Acid-Tooth Dagger</button></div>
									<div className="col-md-6 col-sm-12"><button className="btn btn-primary btn-xs" disabled={boardError}>Blue Charm</button></div>
									<div className="col-md-6 col-sm-12"><button className="btn btn-primary btn-xs" disabled={boardError}>Bone Axe</button></div>
								</div>
							)
					) : (
						<div className="col-md-7 col-sm-12">
							<button className="btn btn-primary" onClick={() => takeControlEvt(slot + 1)}>Control Character</button>
						</div>
					)
				}
			</div>
		</div>
	);
});
