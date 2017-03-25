import React from 'react';
import {connect} from 'react-redux';

import { severeInjuries } from '../../../data/severeInjuries';
import { criticalTableRoll, applyInjury } from '../../../reducers/gameState/armor';

export const CriticalInjury = connect(
	({room}) => {
		return {
			data: room.gameState.board.data
		};
	},
	{criticalTableRollDispatch: criticalTableRoll, applyInjuryDispatch: applyInjury}
)(
	({ data, criticalTableRollDispatch, applyInjuryDispatch }) => {
		const {roll, currentLocation} = data;
		const table = severeInjuries[currentLocation];
		const info = roll && table.tableData[roll - 1];
		return (
			<div className="game-board-grey-over"><div>
				<div className="crit-container">
					<img src={table.tableImg} />
					{ roll &&	<div className="crit-box" style={info} />}
				</div>
				{ !roll ? (
					<div><button className="btn btn-primary" onClick={criticalTableRollDispatch}>Roll on the Table</button></div>
				) : (
					<div>
						<div className={`dice dice-${roll}`} />
						<div><button className="btn btn-primary" onClick={() => applyInjuryDispatch(info)}>Close</button></div>
					</div>
				) }
			</div></div>
		);
	}
);
