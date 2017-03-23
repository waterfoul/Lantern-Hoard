import React from 'react';
import {connect} from 'react-redux';

import {monsters} from '../../../data/monsters';

export const SelectMonsterTarget = connect(
	({room}) => {
		return {
			card: room.gameState.ai.discard[0],
			monsterName: room.gameState.monsterName
		};
	},
	{}
)(
	({ card, monsterName }) => {
		return (
			<div className="game-board-grey-over"><div>
				<div><img src={monsters[monsterName].ai.cards[card].img} /></div>
				<div>Please select a target</div>
			</div></div>
		);
	}
);
