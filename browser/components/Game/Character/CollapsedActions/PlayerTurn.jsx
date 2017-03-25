import React from 'react';
import { connect } from 'react-redux';
import { PleaseWait } from './PleaseWait';
import { moveCharacter, startAttack } from '../../../../reducers/gameState/playerTurn';
import { changeBoardStatusAction, BOARD_STATUSES } from '../../../../../common/gameState/board';
import { items } from '../../../../data/items';


export const PlayerTurn = connect(
	({ auth, room }) => ({
		room,
		board: room.gameState.board,
		user: auth,
		playerResources: room.gameState.playerResources
	}),
	(dispatch) => ({
		moveCharacterDispatch: (character) => dispatch(moveCharacter(character)),
		changeBoardStatusActionDispatch:  (status, data) => dispatch(changeBoardStatusAction(status, data)),
		startAttackDispatch:  (slot, weapon) => dispatch(startAttack(slot, weapon)),
		dispatch
	})
)(({ slot, room, board, user, playerResources, moveCharacterDispatch, changeBoardStatusActionDispatch, startAttackDispatch, dispatch }) => {
	if (slot === board.data && user.id === room[`Player${slot + 1}`].id) {
		const actionList = room.gameState.gear[slot].reduce((acc, data, row) => {
			const result = [...acc];
			data.map((name, column) => {
				const item = items[name];
				if (item) {
					item.specialAbilities.forEach((ability) => {
						result.push(Object.assign({}, ability, {
							name: name + ' (' + ability.name + ')',
							cb: () => {
								dispatch(ability.thunk(slot, row, column));
							}
						}));
					});
					if (item.descriptors.indexOf('weapon') !== -1) {
						result.push({
							name: name + ' (Attack)',
							movement: item.traits.indexOf('cumbersome') !== -1,
							action: true,
							cb: () => {
								startAttackDispatch(slot, name);
							}
						});
					}
				}
			});
			return result;
		}, []);
		return (
			<div className="col-md-7 col-sm-12 attack-buttons container-fluid">
				{playerResources.movements > 0 ? (
					<div className="col-md-6 col-sm-12">
						<button className="btn btn-primary btn-xs" onClick={() => moveCharacterDispatch(slot)}>
							<img src="/static/movement-resource.png" />
							Move
						</button>
					</div>
				) : null}
				<div className="col-md-6 col-sm-12">
					<button className="btn btn-primary btn-xs" onClick={() => changeBoardStatusActionDispatch(BOARD_STATUSES.characterTurnEnd)}>End Turn</button>
				</div>
				{actionList.map((action, i) => ((
					(playerResources.actions > 0 || !action.action) &&
					(playerResources.movements > 0 || !action.movement)
				) ? (
						<div key={i} className="col-md-12 col-sm-12">
							<button className="btn btn-primary btn-xs" onClick={() => action.cb(slot)}>
								{action.movement ? <img src="/static/movement-resource.png" /> : null}
								{action.action ? <img src="/static/action-resource.png" /> : null}
								{action.name}
							</button>
						</div>
				) : null))}
			</div>
		);
	} else {
		return <PleaseWait />;
	}
});
