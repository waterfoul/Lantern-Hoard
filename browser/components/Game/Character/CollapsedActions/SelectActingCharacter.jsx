import React from 'react';
import { connect } from 'react-redux';
import { STATUSES } from '../../../../../common/gameState/knockedDownCharacters';
import { startSingleTurn } from '../../../../reducers/gameState/playerTurn';

export const SelectActingCharacter = connect(
	({ room }) => ({
		room
	}),
	{ startTurnEvt: startSingleTurn }
)(({ room, slot, startTurnEvt }) => (
	<div className="col-md-7 col-sm-12">
		{(
			room.gameState.board.data.indexOf(slot) !== -1 &&
			room.gameState.knockedDownCharacters[slot] === STATUSES.standing
		) ? (
				<div className="col-md-6 col-sm-12">
					<button className="btn btn-primary" onClick={() => startTurnEvt(slot)}>Begin Turn</button>
				</div>
			) : ''}
	</div>
));
