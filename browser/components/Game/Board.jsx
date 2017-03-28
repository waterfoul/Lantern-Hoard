import React from 'react';
import {connect} from 'react-redux';
import {STATUSES} from '../../../common/gameState/knockedDownCharacters';

let display = true;

export const Board = connect(
	({ room, flexBoxFix }) => ({
		room,
		monsterStats: room.gameState.monsterStats,
		positions: room.gameState.positions,
		monsterDirection: room.gameState.monsterDirection,
		knockedDownCharacters: room.gameState.knockedDownCharacters || [],
		flexBoxFix
	})
)(
	({ room, positions, monsterDirection, knockedDownCharacters, monsterStats, flexBoxFix }) => (
		<div>
			<div style={{display: (flexBoxFix) ? 'block' : 'none'}}>
				{/*This div is for fixing some flexbox issues, it just causes chrome to re-render the content below*/}
			</div>
			<img src="/static/board.jpg" className="game-main-image" />
			<div className="game-board-grid">
				{ (positions.player1 && !room.Character1.dead) ? <div className={[
					'game-board-square',
					'character',
					'white',
					knockedDownCharacters[0] !== STATUSES.standing ? 'knocked-down' : '',
					'x-' + positions.player1[0],
					'y-' + positions.player1[1]
				].join(' ')} ><img src="/static/survivor-ezra.jpg" /></div>  : '' }
				{ (positions.player2 && !room.Character2.dead) ? <div className={[
					'game-board-square',
					'character',
					'blue',
					knockedDownCharacters[1] !== STATUSES.standing ? 'knocked-down' : '',
					'x-' + positions.player2[0],
					'y-' + positions.player2[1]
				].join(' ')} ><img src="/static/survivor-zachary.jpg" /></div> : '' }
				{ (positions.player3 && !room.Character3.dead) ? <div className={[
					'game-board-square',
					'character',
					'green',
					knockedDownCharacters[2] !== STATUSES.standing ? 'knocked-down' : '',
					'x-' + positions.player3[0],
					'y-' + positions.player3[1]
				].join(' ')}><img src="/static/survivor-allister.jpg" /></div> : '' }
				{ (positions.player4 && !room.Character4.dead) ? <div className={[
					'game-board-square',
					'character',
					'yellow',
					knockedDownCharacters[3] !== STATUSES.standing ? 'knocked-down' : '',
					'x-' + positions.player4[0],
					'y-' + positions.player4[1]
				].join(' ')} ><img src="/static/survivor-lucy.jpg" /></div>  : '' }
				<div className={[
					'game-board-square',
					'character',
					'monster',
					`direction-${monsterDirection}`,
					'size-' + monsterStats.size,
					'x-' + positions.monster[0],
					'y-' + positions.monster[1]
				].join(' ')} ><img src="/static/white-lion-token.jpg" /></div>
			</div>
		</div>
	)
);
