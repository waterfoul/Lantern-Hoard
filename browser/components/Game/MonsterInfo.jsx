import React from 'react';
import {connect} from 'react-redux';

export const MonsterInfo = connect(
	() => ({
		boardState: {
			monsterStats: {
				luck: Math.floor(Math.random() * 20),
				accuracy: Math.floor(Math.random() * 20),
				evasion: Math.floor(Math.random() * 20),
				speed: Math.floor(Math.random() * 20),
				damage: Math.floor(Math.random() * 20),
				toughness: Math.floor(Math.random() * 20),
				movement: Math.floor(Math.random() * 20)
			}
		}
	})
)(
	({ boardState }) => (
		<div id="game-board-monster">
			<img src="/static/monster-info.jpg" className="game-main-image" />
			<div id="game-board-monster-container">
				<div className="game-board-monster-stats luck"><div>{boardState.monsterStats.luck}</div></div>
				<div className="game-board-monster-stats accuracy"><div>{boardState.monsterStats.accuracy}</div></div>
				<div className="game-board-monster-stats evasion"><div>{boardState.monsterStats.evasion}</div></div>
				<div className="game-board-monster-stats speed"><div>{boardState.monsterStats.speed}</div></div>
				<div className="game-board-monster-stats damage"><div>{boardState.monsterStats.damage}</div></div>
				<div className="game-board-monster-stats toughness"><div>{boardState.monsterStats.toughness}</div></div>
				<div className="game-board-monster-stats movement"><div>{boardState.monsterStats.movement}</div></div>
			</div>
		</div>
	)
);
