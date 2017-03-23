import React from 'react';
import { connect } from 'react-redux';
import { PleaseWait } from './PleaseWait';
import { moveCharacter } from '../../../../reducers/gameState/playerTurn';
import { changeBoardStatusAction, BOARD_STATUSES } from '../../../../../common/gameState/board';

export const PlayerTurn = connect(
	({ auth, room }) => ({
		room,
		board: room.gameState.board,
		user: auth,
		playerResources: room.gameState.playerResources
	}),
	{ moveCharacterDispatch: moveCharacter, changeBoardStatusActionDispatch: changeBoardStatusAction}
)(({ slot, room, board, user, playerResources, moveCharacterDispatch, changeBoardStatusActionDispatch }) => {
	const character = room[`Character${slot + 1}`];
	if (slot === board.data && user.id === room[`Player${slot + 1}`].id) {
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
				{playerResources.movements > 0 ? (
					<div className="col-md-6 col-sm-12">
						<button className="btn btn-primary btn-xs" onClick={() => moveCharacterDispatch(slot)}>
							<img src="/static/movement-resource.png" />
							Move
						</button>
					</div>
				) : null}
				{playerResources.actions > 0 ? (
					<div className="col-md-6 col-sm-12">
						<button className="btn btn-primary btn-xs">Action</button>
					</div>
				) : null}
				<div className="col-md-6 col-sm-12">
					<button className="btn btn-primary btn-xs" onClick={() => changeBoardStatusActionDispatch(BOARD_STATUSES.characterTurnEnd)}>End Turn</button>
				</div>
			</div>
		);
	} else {
		return <PleaseWait />;
	}
});
