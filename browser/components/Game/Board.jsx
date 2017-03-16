import React from 'react';
import {connect} from 'react-redux';

export const Board = connect(
	() => ({
		boardState: {
			positions: {
				white: [Math.floor(Math.random() * 22), Math.floor(Math.random() * 16)],
				yellow: [Math.floor(Math.random() * 22), Math.floor(Math.random() * 16)],
				green: [Math.floor(Math.random() * 22), Math.floor(Math.random() * 16)],
				blue: [Math.floor(Math.random() * 22), Math.floor(Math.random() * 16)],
				monster: [Math.floor(Math.random() * 22), Math.floor(Math.random() * 16)]
			}
		}
	})
)(
	({ boardState }) => (
		<div>
			<img src="/static/board.jpg" className="game-main-image"/>
			<div id="game-board-grid">
				<div className={[
					'game-board-square',
					'white',
					'x-' + boardState.positions.white[0],
					'y-' + boardState.positions.white[1]
				].join(' ')}></div>
				<div className={[
					'game-board-square',
					'yellow',
					'x-' + boardState.positions.yellow[0],
					'y-' + boardState.positions.yellow[1]
				].join(' ')}></div>
				<div className={[
					'game-board-square',
					'green',
					'x-' + boardState.positions.green[0],
					'y-' + boardState.positions.green[1]
				].join(' ')}></div>
				<div className={[
					'game-board-square',
					'blue',
					'x-' + boardState.positions.blue[0],
					'y-' + boardState.positions.blue[1]
				].join(' ')}></div>
				<div className={[
					'game-board-square',
					'monster',
					'x-' + boardState.positions.monster[0],
					'y-' + boardState.positions.monster[1]
				].join(' ')}></div>
			</div>
		</div>
	)
);
