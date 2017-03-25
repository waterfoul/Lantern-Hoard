import React from 'react';
import { connect } from 'react-redux';
import { PleaseWait } from './PleaseWait';
import { moveCharacter, startAttack, endSingleTurn } from '../../../../reducers/gameState/playerTurn';
import { changeBoardStatusAction, BOARD_STATUSES } from '../../../../../common/gameState/board';
import { items } from '../../../../data/items';

let nextChars = null;

function buildButtonsForItem(name, result, slot, row, column, dispatch, startAttackDispatch) {
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
}

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
		endSingleTurnDispatch: (data) => dispatch(endSingleTurn(data)),
		dispatch
	})
)(({ slot, room, board, user, playerResources, endSingleTurnDispatch, moveCharacterDispatch, changeBoardStatusActionDispatch, startAttackDispatch, dispatch }) => {
	if (slot === board.data.character && user.id === room[`Player${slot + 1}`].id) {
		const actionList = room.gameState.gear[slot].reduce((acc, data, row) => {
			const result = [...acc];
			data.map((name, column) => {
				buildButtonsForItem(name, result, slot, row, column, dispatch, startAttackDispatch);
			});
			return result;
		}, []);

		buildButtonsForItem('Fist & Tooth', actionList, slot, -1, -1, dispatch, startAttackDispatch);
		console.log(board.data);
		return (
			<div className="col-md-7 col-sm-12 attack-buttons container-fluid">
				{playerResources.movements > 0 ? (
					<div className="col-md-6 col-sm-12">
						<button className="btn btn-primary btn-xs" onClick={() => moveCharacterDispatch(board.data)}>
							<img src="/static/movement-resource.png" />
							Move
						</button>
					</div>
				) : null}
				<div className="col-md-6 col-sm-12">
					<button className="btn btn-primary btn-xs" onClick={() => {console.log('here');endSingleTurnDispatch(board.data);}}>End Turn</button>
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
