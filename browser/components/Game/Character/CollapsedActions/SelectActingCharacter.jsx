import React from 'react';
import {connect} from 'react-redux';
import { changeBoardStatusAction, BOARD_STATUSES } from '../../../../../common/gameState/board';
import {startSingleTurn} from '../../../../reducers/gameState/playerTurn';

export const SelectActingCharacter = connect(
	({room, auth}) => ({
		room
	}),
	{startTurnEvt: startSingleTurn}
)(({room, slot, startTurnEvt}) => (
	<div className="col-md-7 col-sm-12">
		{room.gameState.board.data.indexOf(slot) !== -1 ? (
				<div className="col-md-6 col-sm-12">
					<button className="btn btn-primary" onClick={() => startTurnEvt(slot)}>Begin Turn</button>
				</div>
			) : ''}
	</div>
));