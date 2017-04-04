import React from 'react';
import { connect } from 'react-redux';
import { rollTrigger } from '../../../reducers/gameState/monsterController';

import { monsters } from '../../../data/monsters';

export const TriggerRoll = connect(
	({ room }) => {
		return {
			title: room.gameState.board.data.title,
			img: room.gameState.board.data.img,
			trigger: room.gameState.board.data.trigger,
			roll: room.gameState.board.data.roll,
			nextState: room.gameState.board.data.nextState,
			monsterName: room.gameState.monsterName
		};
	},
	(dispatch) => ({
		triggerEvt: (roll, trigger, monsterName, nextState) => {
			let cardList = monsters[monsterName][trigger.type];

			if (trigger.type === 'ai') {
				cardList = cardList.cards;
			}

			const thunk = cardList[trigger.card].triggers[trigger.thunk];
			dispatch(thunk(roll, nextState));
		},
		rollTriggerEvt: () => dispatch(rollTrigger())
	})
)(
	({ title, img, trigger, roll, nextState, monsterName, triggerEvt, rollTriggerEvt }) => {
		return (
			<div className="game-board-grey-over"><div>
				<div>{title}</div>
				<div><img src={img} /></div>
				{!roll ? (
						<div><button className="btn btn-primary" onClick={rollTriggerEvt}>Roll</button></div>
				) : (
						<div>
							<div className={`dice dice-${roll}`} />
							<div><button className="btn btn-primary" onClick={() => triggerEvt(roll, trigger, monsterName, nextState)}>Close</button></div>
						</div>
				)}
			</div></div>
		);
	}
);
