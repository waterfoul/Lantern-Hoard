import React from 'react';
import {connect} from 'react-redux';

import {monsters} from '../../../data/monsters';
import {move} from '../../../reducers/gameState/positions';

export const InitialPlacement = connect(
	({ room, auth }) => ({
		monsterName: room.gameState.monsterName,
		positions: room.gameState.positions,
		room: room,
		user: auth
	}),
	(dispatch) => ({
		placeCurrent: (location, positions, room, user) => {
			const player = (!positions.player1 ? 1 : (!positions.player2 ? 2 : (!positions.player3 ? 3 : 4)));
			if (room[`Player${player}`].id === user.id) {
				dispatch(move('player' + player, location));
			}
		}
	})
)(
	({ monsterName, positions, room, user, placeCurrent }) => (
		<div>
			<div className="game-board-grid">
				{ monsters[monsterName].initialPlacements.map((loc) => {
					if (
						(positions.player1 && loc[0] === positions.player1[0] && loc[1] === positions.player1[1]) ||
						(positions.player2 && loc[0] === positions.player2[0] && loc[1] === positions.player2[1]) ||
						(positions.player3 && loc[0] === positions.player3[0] && loc[1] === positions.player3[1]) ||
						(positions.player4 && loc[0] === positions.player4[0] && loc[1] === positions.player4[1])
					) {
						return null;
					} else {
						return (
							<div
								key={loc.join('x')}
								className={[
									'game-board-square',
									'initialPlacement',
									'x-' + loc[0],
									'y-' + loc[1]
								].join(' ')}
								onClick={() => placeCurrent(loc, positions, room, user)}
							/>
						);
					}
				})
				}
			</div>
		</div>
	)
);
