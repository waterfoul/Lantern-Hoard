import React from 'react';
import { connect } from 'react-redux';

import { takeControl } from '../../../reducers/room';
import { BOARD_STATUSES } from '../../../../common/gameState/board';
import { getStats } from '../../../utils/getStats';

import { PleaseWait } from './CollapsedActions/PleaseWait';
import { PlayerTurn } from './CollapsedActions/PlayerTurn';
import { SelectCharacter } from './CollapsedActions/SelectCharacter';
import { SelectActingCharacter } from './CollapsedActions/SelectActingCharacter';
import { TOKEN_TYPES } from '../../../../common/gameState/tokens';
import { Dead } from './Dead';

const getPlacementText = (positions, room, slot, user) => {
	const placingPlayer = (!positions.player1 ? 0 : (!positions.player2 ? 1 : (!positions.player3 ? 2 : 3)));
	if (placingPlayer === slot && room[`Player${slot + 1}`].id === user.id) {
		return 'Place Me on the Board';
	} else {
		return 'Please Wait...';
	}
};

function getButtons({
	positions,
	room,
	slot,
	user,
	board,
	monsterController,
	takeControlEvt
}) {
	if (room[`Player${slot + 1}`]) {
		switch (board.status) {
		case BOARD_STATUSES.initialPlacement:
			return (
				<div className="col-md-7 col-sm-12">
					{getPlacementText(positions, room, slot, user)}
				</div>
			);
		case BOARD_STATUSES.showMonsterPositions:
			return (
				<div className="col-md-7 col-sm-12">
					{ user.id === monsterController ? 'Move the monster' : '' }
				</div>
			);
		case BOARD_STATUSES.targetChoice:
			return <SelectCharacter slot={slot} />;
		case BOARD_STATUSES.selectActingCharacter:
			return <SelectActingCharacter slot={slot} />;
		case BOARD_STATUSES.playerDamage:
			return (
				<div className="col-md-7 col-sm-12">
					{room.gameState.board.data.target === slot ? 'Damage Me' : ''}
				</div>
			);
		case BOARD_STATUSES.playerTurn:
			return (
				<PlayerTurn slot={slot} />
			);
		case BOARD_STATUSES.showAvailableMovement:
			return (
					<div className="col-md-7 col-sm-12">
						{room.gameState.board.data.target === slot ? 'Move Me' : ''}
					</div>
			);
		case BOARD_STATUSES.playerAttack:
			return (
				<div className="col-md-7 col-sm-12">
					{room.gameState.board.data.slot === slot ? 'Attack!' : ''}
				</div>
			);
		default:
			return (
				<PleaseWait />
			);
		}
	} else {
		return (
			<div className="col-md-7 col-sm-12">
				<button className="btn btn-primary" onClick={() => takeControlEvt(slot + 1)}>Control Character</button>
			</div>
		);
	}
}

function armorDisp(val) {
	if (val === -2) {
		return 'H';
	} else if (val === -1) {
		return 'L';
	} else {
		return val;
	}
}

export const Collapsed = connect(
	({ room, boardError, auth }) => ({
		tokens: room.gameState.tokens || [[], [], [], []],
		armor: room.gameState.armor,
		board: room.gameState.board || {},
		room: room,
		monsterController: room.gameState.monsterController,
		positions: room.gameState.positions,
		user: auth,
		boardError
	}),
	{ takeControlEvt: takeControl }
)(({ tokens, armor, slot, room, monsterController, board, positions, user, boardError, takeControlEvt }) => {
	const character = room['Character' + (slot + 1)];
	const stats = getStats(character, room.gameState, slot);
	const player = room[`Player${slot + 1}`] || {};
	const isMonsterController = monsterController === player.id;
	return (character.dead ? (<Dead />) : (
		<div>
			{ isMonsterController ? <img className="game-character-monster-controller" src="/static/monster-controller.jpg" /> : '' }
			<div className="game-character-collapsed container-fluid">
				<div className="col-md-5 col-sm-12">
					<div>{character.name}</div>
					<div>{ player.name || 'Open' }</div>
					<div>
						<i className="glyphicon glyphicon-screenshot" />&nbsp;
						<span>
							{stats.movement}
							&nbsp;/&nbsp;
							{stats.accuracy}
							&nbsp;/&nbsp;
							{stats.strength}
							&nbsp;/&nbsp;
							{stats.evasion}
							&nbsp;/&nbsp;
							{stats.luck}
							&nbsp;/&nbsp;
							{stats.speed}
						</span>
					</div>
					<div>
						<i className="glyphicon glyphicon-heart" />&nbsp;
						<span>
							{armorDisp(armor[slot].head)}
							&nbsp;/&nbsp;
							{armorDisp(armor[slot].body)}
							&nbsp;/&nbsp;
							{armorDisp(armor[slot].waist)}
							&nbsp;/&nbsp;
							{armorDisp(armor[slot].hand)}
							&nbsp;/&nbsp;
							{armorDisp(armor[slot].foot)}
						</span>
					</div>
					<div>
						<i className="glyphicon glyphicon-tint" />&nbsp;
							<span>
								{tokens[slot].filter((token) => token.tokenType === TOKEN_TYPES.bleeding).length} / 5
							</span>
					</div>
				</div>
				{ getButtons({positions, room, slot, user, board, boardError, monsterController, takeControlEvt}) }
			</div>
		</div>
	));
});
