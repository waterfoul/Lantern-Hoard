import React from 'react';
import {connect} from 'react-redux';

export const MonsterInfo = connect(
	({ room, flexBoxFix }) => ({
		monsterStats: room.gameState.monsterStats,
		flexBoxFix
	})
)(
	({ monsterStats, flexBoxFix }) => (
		<div id="game-board-monster">
			<div style={{display: (flexBoxFix) ? 'block' : 'none'}}>
				{/*This div is for fixing some flexbox issues, it just causes chrome to re-render the content below*/}
			</div>
			<img src="/static/monster-info.jpg" className="game-main-image" />
			<div id="game-board-monster-container">
				<div className="game-board-monster-stats luck"><div>{monsterStats.luck}</div></div>
				<div className="game-board-monster-stats accuracy"><div>{monsterStats.accuracy}</div></div>
				<div className="game-board-monster-stats evasion"><div>{monsterStats.evasion}</div></div>
				<div className="game-board-monster-stats speed"><div>{monsterStats.speed}</div></div>
				<div className="game-board-monster-stats damage"><div>{monsterStats.damage}</div></div>
				<div className="game-board-monster-stats toughness"><div>{monsterStats.toughness}</div></div>
				<div className="game-board-monster-stats movement"><div>{monsterStats.movement}</div></div>
			</div>
		</div>
	)
);
