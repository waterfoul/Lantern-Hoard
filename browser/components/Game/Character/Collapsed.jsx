import React from 'react';
import { connect } from 'react-redux';

import { takeControl } from '../../../reducers/room';
import { changeBoardStatusAction, BOARD_STATUSES } from '../../../../common/gameState/board';
import { getStats } from '../../../utils/getStats';
import { PleaseWait } from './CollapsedActions/PleaseWait';
import { PlayerTurn } from './CollapsedActions/PlayerTurn';

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
	boardError,
	monsterController,
	takeControlEvt,
	changeBoardStatusActionDisp
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
			return (
				<div className="col-md-7 col-sm-12">
					{room.gameState.board.data.indexOf(slot) !== -1 ? (
						<div className="col-md-6 col-sm-12">
								{ user.id === monsterController ? <button className="btn btn-primary" onClick={() => changeBoardStatusActionDisp(BOARD_STATUSES.targetChosen, slot)}>Select</button> : 'Please Wait...' }
						</div>
					) : ''}
				</div>
			);
		case BOARD_STATUSES.selectActingCharacter:
			return (
				<div className="col-md-7 col-sm-12">
					{room.gameState.board.data.indexOf(slot) !== -1 ? (
						<div className="col-md-6 col-sm-12">
							<button className="btn btn-primary" onClick={() => changeBoardStatusActionDisp(BOARD_STATUSES.actingCharacterChosen, slot)}>Begin Turn</button>
						</div>
					) : ''}
				</div>
			);
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

export const Collapsed = connect(
	({ room, boardError, auth }) => ({
		armor: room.gameState.armor,
		board: room.gameState.board || {},
		room: room,
		monsterController: room.gameState.monsterController,
		positions: room.gameState.positions,
		user: auth,
		boardError
	}),
	{ takeControlEvt: takeControl, changeBoardStatusActionDisp: changeBoardStatusAction }
)(({ armor, slot, room, monsterController, board, positions, user, boardError, takeControlEvt, changeBoardStatusActionDisp }) => {
	const character = room['Character' + (slot + 1)];
	const stats = getStats(character, room.gameState, slot);
	const player = room[`Player${slot + 1}`] || {};
	const isMonsterController = monsterController === player.id;
	return (
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
							{armor[slot].head}
							&nbsp;/&nbsp;
							{armor[slot].body}
							&nbsp;/&nbsp;
							{armor[slot].waist}
							&nbsp;/&nbsp;
							{armor[slot].hand}
							&nbsp;/&nbsp;
							{armor[slot].foot}
						</span>
					</div>
				</div>
				{ getButtons({positions, room, slot, user, board, boardError, monsterController, takeControlEvt, changeBoardStatusActionDisp}) }
			</div>
		</div>
	);
});
