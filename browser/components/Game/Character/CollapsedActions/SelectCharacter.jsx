import React from 'react';
import {connect} from 'react-redux';
import { changeBoardStatusAction, BOARD_STATUSES } from '../../../../../common/gameState/board';

export const SelectCharacter = connect(
	({room, auth}) => ({
		room,
		user: auth,
		monsterController: room.gameState.monsterController,
	}),
	{changeBoardStatusActionDisp: changeBoardStatusAction}
)(({room, slot, user, monsterController, changeBoardStatusActionDisp}) => (
	<div className="col-md-7 col-sm-12">
		{room.gameState.board.data.indexOf(slot) !== -1 ? (
				<div className="col-md-6 col-sm-12">
					{ user.id === monsterController ? <button className="btn btn-primary" onClick={() => changeBoardStatusActionDisp(BOARD_STATUSES.targetChosen, slot)}>Select</button> : 'Please Wait...' }
				</div>
			) : ''}
	</div>
));
