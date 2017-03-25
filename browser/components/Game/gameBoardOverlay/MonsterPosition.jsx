import React from 'react';
import {connect} from 'react-redux';

import {attackAfterMove} from '../../../reducers/gameState/monsterController';

export const MonsterPosition = connect(
	({ room, auth }) => ({
		monsterStats: room.gameState.monsterStats,
		monsterController: room.gameState.monsterController,
		data: room.gameState.board.data,
		user: auth
	}),
	{attackAfterMoveDisp: attackAfterMove}
)(
	({ monsterController, monsterStats, data, user, attackAfterMoveDisp }) => (
		<div>
			<div className="game-board-grid">
				{ user.id === monsterController ? (
					data.positions.map((loc, i) => (
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
						  onClick={() => attackAfterMoveDisp(data.target, data.speed, data.accuracy, data.damage, loc, data.nextStatus)}
						/>
					))
				) : null }
			</div>
		</div>
	)
);
