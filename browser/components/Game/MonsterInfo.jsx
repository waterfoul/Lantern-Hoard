import React from 'react';
import {connect} from 'react-redux';

import {monsters} from '../../data/monsters';

export const MonsterInfo = connect(
	({ room, flexBoxFix }) => ({
		monsterStats: room.gameState.monsterStats,
		monsterName: room.gameState.monsterName,
		ai: room.gameState.ai,
		hl: room.gameState.hl,
		effects: room.gameState.effects,
		flexBoxFix
	})
)(
	({ monsterStats, monsterName, flexBoxFix, ai, hl, effects }) => {
		return (
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
					{effects.map((eff, i) => {
						return (
							<div className={`game-board-monster-card effect-${i}`} key={i} >
								<img src={eff.image} />
							</div>
						);
					})}
					<div className="game-board-monster-card hl-discard">
						{ hl.discard && hl.discard.length ? (
								<img src={
									monsters[monsterName].hl[hl.discard[0]] ?
										monsters[monsterName].hl[hl.discard[0]].img :
										monsters[monsterName].hlBack
								} />
							) : ''}
					</div>
					<div className="game-board-monster-card hl-draw">
						<img src={monsters[monsterName].hlBack} />
						<div className="numbers">{hl.deck.length} / {hl.deck.length + hl.discard.length}</div>
					</div>
					<div className="game-board-monster-card ai-discard">
						{ ai.discard && ai.discard.length ? (
								<img src={
									monsters[monsterName].ai.cards[ai.discard[0]] ?
										monsters[monsterName].ai.cards[ai.discard[0]].img :
										monsters[monsterName].aiBack
								} />
							) : ''}
					</div>
					<div className="game-board-monster-card ai-draw">
						<img src={monsters[monsterName].aiBack} />
						<div className="numbers">{ai.deck.length} / {ai.deck.length + ai.discard.length}</div>
					</div>
					<div className="game-board-monster-card ai-wound">
						{ ai.wound && ai.wound.length ? (
								<div>
									<img src={monsters[monsterName].aiBack} />
									<div className="numbers">{ai.wound.length}</div>
								</div>
							) : ''}
					</div>
					<div className="game-board-monster-card basic-action">
						<img src={monsters[monsterName].ai.cards['Basic Action'].img} />
					</div>
				</div>
			</div>
		);
	}
);
