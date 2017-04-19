import React from 'react';
import { connect } from 'react-redux';
import { STATUSES } from '../../../../../common/gameState/knockedDownCharacters';
import { startSingleTurn } from '../../../../reducers/gameState/playerTurn';

export const SelectActingCharacter = connect(
	({ room, auth: user }) => ({
		room,
		user
	}),
	{ startTurnEvt: startSingleTurn }
)(({ room, user, slot, startTurnEvt }) => (
	<div className="col-md-7 col-sm-12">
		{(
			room.gameState.board.data.indexOf(slot) !== -1 &&
			room.gameState.knockedDownCharacters[slot] === STATUSES.standing &&
			user.id === room[`Player${slot + 1}`].id
		) ? (
				<div className="col-md-6 col-sm-12">
					<button className="btn btn-primary" onClick={() => startTurnEvt(slot)}>Begin Turn</button>
				</div>
			) : ''}
	</div>
));
