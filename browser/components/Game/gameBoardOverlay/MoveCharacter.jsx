import React from 'react';
import { connect } from 'react-redux';

import { BOARD_STATUSES, changeBoardStatusAction } from '../../../../common/gameState/board';
import { finishMovement } from '../../../reducers/gameState/playerTurn';
import { getMovement } from '../../../utils/getStats';


export const MoveCharacter = connect(
	({ room, auth }) => ({
		monsterName: room.gameState.monsterName,
		positions: room.gameState.positions,
		data: room.gameState.board.data,
		room: room,
		user: auth
	}),
	{placeCurrent: finishMovement}
)(
	({ positions, room, placeCurrent, data }) => {
		const currentCharacterMovement = getMovement(room[`Character${data.character + 1}`], room.gameState, data.character);
		const currentPlayerPosition = positions[`player${data.character + 1}`];
		let options = [];

		for (let i = currentCharacterMovement; i > 0; i--) {
			options.push([currentPlayerPosition[0] + i, currentPlayerPosition[1]]);
			options.push([currentPlayerPosition[0] - i, currentPlayerPosition[1]]);
			options.push([currentPlayerPosition[0], currentPlayerPosition[1] + i]);
			options.push([currentPlayerPosition[0], currentPlayerPosition[1] - i]);
			for (let j = 5 - i; j > 0; j--) {
				options.push([currentPlayerPosition[0] + i, currentPlayerPosition[1] + j]);
				options.push([currentPlayerPosition[0] - i, currentPlayerPosition[1] + j]);
				options.push([currentPlayerPosition[0] + i, currentPlayerPosition[1] - j]);
				options.push([currentPlayerPosition[0] - i, currentPlayerPosition[1] - j]);
			}
		}
		const monsterSize = room.gameState.monsterStats.size;

		options = options.filter((coords) => {
			const monsterDiffX = coords[0] - positions.monster[0];
			const monsterDiffY = coords[1] - positions.monster[1];
			return (
				coords[0] >= 0 && coords[1] >= 0 &&
				coords[0] <= 21 && coords[1] <= 15 &&
				(coords[0] !== positions.player1[0] || coords[1] !== positions.player1[1]) &&
				(coords[0] !== positions.player2[0] || coords[1] !== positions.player2[1]) &&
				(coords[0] !== positions.player3[0] || coords[1] !== positions.player3[1]) &&
				(coords[0] !== positions.player4[0] || coords[1] !== positions.player4[1]) &&
				(monsterDiffX < 0 || monsterDiffX >= monsterSize || monsterDiffY > 0 || monsterDiffY <= (monsterSize * -1))
			);
		});
		return (
			<div>
				<div className="game-board-grid">
					{options.map((loc) => {

						return (
							<div
								key={loc.join('x')}
								className={[
									'game-board-square',
									'initialPlacement',
									'x-' + loc[0],
									'y-' + loc[1]
								].join(' ')}
								onClick={() => placeCurrent(loc, data)}
							/>

						);
					})}
				</div>
			</div>
		);
	}
);
