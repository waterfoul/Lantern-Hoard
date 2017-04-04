import React from 'react';
import { connect } from 'react-redux';
import { STATUSES } from '../../../common/gameState/knockedDownCharacters';

const IMAGES = [
	'/static/survivor-ezra.jpg',
	'/static/survivor-zachary.jpg',
	'/static/survivor-allister.jpg',
	'/static/survivor-lucy.jpg'
];

const COLORS = [
	'white',
	'blue',
	'green',
	'yellow'
];

function getCharacterToken(slot, room, knockedDownCharacters, positions) {
	return (
		(positions[`player${slot + 1}`] && !room[`Character${slot + 1}`].dead) ? (
			<div className={[
				'game-board-square',
				'character',
				COLORS[slot],
				knockedDownCharacters[0] !== STATUSES.standing ? 'knocked-down' : '',
				'x-' + positions[`player${slot + 1}`][0],
				'y-' + positions[`player${slot + 1}`][1]
			].join(' ')} ><img src={IMAGES[slot]} /></div>
		) : ''
	);
}

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
			<div style={{ display: (flexBoxFix) ? 'block' : 'none' }}>
				{/*This div is for fixing some flexbox issues, it just causes chrome to re-render the content below*/}
			</div>
			<img src="/static/board.jpg" className="game-main-image" />
			<div className="game-board-grid">
				{ getCharacterToken(0, room, knockedDownCharacters, positions) }
				{ getCharacterToken(1, room, knockedDownCharacters, positions) }
				{ getCharacterToken(2, room, knockedDownCharacters, positions) }
				{ getCharacterToken(3, room, knockedDownCharacters, positions) }
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
