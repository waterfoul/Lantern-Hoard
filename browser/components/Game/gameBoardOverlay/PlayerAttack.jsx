import React from 'react';
import {connect} from 'react-redux';

import {rollToHit} from '../../../reducers/gameState/playerTurn';

export const PlayerAttack = connect(
	({room, auth}) => {
		return {
			user: auth,
			slot: room.gameState.board.data.slot,
			hitRolls: room.gameState.board.data.hitRolls,
			hitCards: room.gameState.board.data.hitCards,
			room
		};
	},
	{rollToHitEvt: rollToHit}
)(
	({ slot, hitRolls, hitCards, user, room, rollToHitEvt }) => {
		const isController = user.id === room[`Player${slot + 1}`].id;
		return (
			<div className="game-board-grey-over" id="player-damage"><div>
				{ !hitRolls ? (
						(isController ? <div><button className="btn btn-primary" onClick={rollToHitEvt}>Roll To Hit</button></div> : null)
					) : (
						<div>
							{hitRolls.map((val, i) => (<div key={i} className="game-board-player-damage-dice">
								<div className={`dice dice-${val}`} />
								<div>{hitCards[i] ? 'Hit!' : 'Miss!'}</div>

							</div>))}
						</div>
					) }

			</div></div>
		);
	}
);
