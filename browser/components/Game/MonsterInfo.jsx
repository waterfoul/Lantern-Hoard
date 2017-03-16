import React from 'react';
import {connect} from 'react-redux';

export const MonsterInfo = connect(
	() => ({
		boardState: {
			positions: {
				white: [0, 3],
				yellow: [5, 6],
				green: [7, 7],
				blue: [1, 1],
				monster: [4, 4]
			}
		}
	})
)(
	({ boardState }) => (
		<div>
			<img src="/static/monster-info.jpg" className="game-main-image" />
		</div>
	)
);
