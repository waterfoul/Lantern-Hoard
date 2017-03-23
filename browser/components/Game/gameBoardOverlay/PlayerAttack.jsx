import React from 'react';
import {connect} from 'react-redux';

import {rollToHit, rollToWound, closeAttack} from '../../../reducers/gameState/playerTurn';
import {monsters} from '../../../data/monsters';

export const PlayerAttack = connect(
	({room, auth}) => {
		return {
			user: auth,
			slot: room.gameState.board.data.slot,
			item: room.gameState.board.data.item,
			hitRolls: room.gameState.board.data.hitRolls,
			hitCards: room.gameState.board.data.hitCards,
			woundRolls: room.gameState.board.data.woundRolls,
			woundResults: room.gameState.board.data.woundResults,
			monsterName: room.gameState.monsterName,
			room
		};
	},
	{rollToHitEvt: rollToHit, rollToWoundEvt: rollToWound, closeAttackEvt: closeAttack}
)(
	({ slot, item, hitRolls, hitCards, woundRolls, woundResults, monsterName, user, room, rollToHitEvt, rollToWoundEvt, closeAttackEvt }) => {
		const isController = user.id === room[`Player${slot + 1}`].id;
		return (
			<div className="game-board-grey-over" id="player-attack"><div>
				{ (!hitRolls) ? (
						(isController ? <div>
								<div><img src={item.img} /></div>
								<div><button className="btn btn-primary" onClick={rollToHitEvt}>Roll To Hit</button></div>
						</div> : <div><img src={item.img} /></div>)
					) : (
						<div>
							{ hitRolls.map((val, i) => (<div key={i} className="game-board-player-damage-dice">
								<div className={`dice hit-dice dice-${val}`} />
								<div>{ hitCards[i] ? 'Hit!' : 'Miss!' }</div>
								{ hitCards[i] ? (<div>
									<div><img src={ monsters[monsterName].hl[hitCards[i]].img } className="card" /></div>
									{ woundRolls[i] ? (
											<div>
												<div className={`dice hit-dice dice-${woundRolls[i]}`} />
												<div>{woundResults[i]}!</div>
											</div>
										) : (
											(isController ? <div><button className="btn btn-primary" onClick={() => rollToWoundEvt(i)}>Roll To Wound This<br />Hit Location</button></div> : null)
										)}
								</div>) : null }
							</div>))}
							<div>{(isController && hitRolls.length === (hitCards.filter((v) => !v).length + woundResults.filter((v) => v).length)) ? (
									<button className="btn btn-primary" onClick={closeAttackEvt}>Close</button>
								) : null}</div>
						</div>
					) }

			</div></div>
		);
	}
);
