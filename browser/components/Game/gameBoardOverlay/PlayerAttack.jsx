import React from 'react';
import { connect } from 'react-redux';

import { rollToHit, rollToWound, closeAttack } from '../../../reducers/gameState/playerTurn';
import { STATUSES } from '../../../../common/gameState/knockedDownCharacters';
import { monsters } from '../../../data/monsters';
import { getDistance } from '../../../utils/getDistance';

export const PlayerAttack = connect(
	({ room, auth }) => {
		return {
			user: auth,
			slot: room.gameState.board.data.slot,
			item: room.gameState.board.data.item,
			hitRolls: room.gameState.board.data.hitRolls,
			hitCards: room.gameState.board.data.hitCards,
			woundRolls: room.gameState.board.data.woundRolls,
			woundResults: room.gameState.board.data.woundResults,
			trap: room.gameState.board.data.trap,
			monsterName: room.gameState.monsterName,
			knockedDownCharacters: room.gameState.knockedDownCharacters,
			monsterSize: room.gameState.monsterStats.size,
			positions: room.gameState.positions,
			room
		};
	},
	{ rollToHitEvt: rollToHit, rollToWoundEvt: rollToWound, closeAttackEvt: closeAttack }
)(
	({ slot, item, trap, hitRolls, hitCards, woundRolls, woundResults, monsterName, user, knockedDownCharacters, monsterSize, positions, room, rollToHitEvt, rollToWoundEvt, closeAttackEvt }) => {
		const isController = user.id === room[`Player${slot + 1}`].id;
		const monsterDistance = getDistance(monsterSize, positions.monster, positions[`player${slot + 1}`]);
		const range = item.range || 1;
		const attackFinished = (
			// Out of range
			range < monsterDistance ||
			// Knocked down
			knockedDownCharacters[slot] !== STATUSES.standing ||
			// Hit the trap
			trap ||
			// We've wounded all hits
			(hitRolls && hitRolls.length === (hitCards.filter((v) => !v).length + woundResults.filter((v) => v).length))
		);
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
										(isController && !attackFinished ? <div><button className="btn btn-primary" onClick={() => rollToWoundEvt(i)}>Roll To Wound This<br />Hit Location</button></div> : null)
									)}
								</div>) : null }
							</div>))}
							<div>{(isController && attackFinished) ? (
									<button className="btn btn-primary" onClick={closeAttackEvt}>Close</button>
								) : null}</div>
						</div>
					) }

			</div></div>
		);
	}
);
