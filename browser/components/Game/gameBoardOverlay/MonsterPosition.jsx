import React from 'react';
import {connect} from 'react-redux';

import {changeBoardStatusAction, BOARD_STATUSES} from '../../../../common/gameState/board';

export const MonsterPosition = connect(
	({ room, auth }) => ({
		monsterStats: room.gameState.monsterStats,
		monsterController: room.gameState.monsterController,
		data: room.gameState.board.data,
		user: auth
	}),
	{changeBoardStatusActionDisp: changeBoardStatusAction}
)(
	({ monsterController, monsterStats, data, user, changeBoardStatusActionDisp }) => (
		<div>
			<div className="game-board-grid">
				{ user.id === monsterController ? (
					data.map((loc, i) => (
						<div
							key={i}
							className={[
								'monster-option',
								'monster',
								`option-${i}`,
								'size-' + monsterStats.size,
								'x-' + loc[0],
								'y-' + loc[1]
							].join(' ')}
						  onClick={() => changeBoardStatusActionDisp(BOARD_STATUSES.showMonsterPositionsResult, loc)}
						/>
					))
				) : null }
			</div>
		</div>
	)
);
