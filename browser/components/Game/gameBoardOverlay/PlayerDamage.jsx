import React from 'react';
import {connect} from 'react-redux';

import {monsters} from '../../../data/monsters';
import {rollForMonsterHits, rollForMonsterWounds, applyDamage} from '../../../reducers/gameState/board';

// TODO: Only show buttons for monster controller
export const PlayerDamage = connect(
	({room, auth}) => {
		const monsterName = room.gameState.monsterName;
		const card = room.gameState.ai.discard[0];
		return {
			card: monsters[monsterName].ai.cards[card].img,
			data: room.gameState.board.data,
			isMonsterController: room.gameState.monsterController === auth.id
		};
	},
	{rollForHitsEvt: rollForMonsterHits, rollForMonsterWoundsEvt: rollForMonsterWounds, applyDamageEvt: applyDamage}
)(
	({ card, data, isMonsterController, rollForHitsEvt, rollForMonsterWoundsEvt, applyDamageEvt }) => (
		<div className="game-board-grey-over" id="player-damage"><div>
			<div><img src={card} className="card" /></div>
			{ !data.rolls ? (
				isMonsterController ? (
					<div><button className="btn btn-primary" onClick={rollForHitsEvt}>Roll For Hits</button></div>
				) : null
			) : (
				<div>
					<div>{data.rolls.map((val, i) => (<div key={i} className="game-board-player-damage-dice">
						<div className={`dice dice-${val}`} />
						<div>{data.hits[i] ? 'Hit!' : 'Miss!'}</div>
						{ data.wounds ? (<div className={`dice wound-${data.wounds[i]}`} />) : null }
					</div>))}</div>
					{ isMonsterController ? (!data.wounds ?
						(<div><button className="btn btn-primary" onClick={rollForMonsterWoundsEvt}>Roll For Wounds</button></div>) :
						(<div><button className="btn btn-primary" onClick={applyDamageEvt}>Apply Damage</button></div>)
						) : null}
				</div>
			) }

		</div></div>
	)
);
