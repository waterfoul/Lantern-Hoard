import React from 'react';
import { connect } from 'react-redux';
import { PleaseWait } from './PleaseWait';
import { moveCharacter, startAttack, endSingleTurn } from '../../../../reducers/gameState/playerTurn';
import { getDistance } from '../../../../utils/getDistance';
import { STATUSES } from '../../../../../common/gameState/knockedDownCharacters';
import { items } from '../../../../data/items';

function buildButtonsForItem(name, result, slot, row, column, dispatch, startAttackDispatch) {
	const item = items[name];
	if (item) {
		item.specialAbilities.forEach((ability) => {
			result.push(Object.assign({}, ability, {
				name: name + ' (' + ability.name + ')',
				range: ability.range || item.range || 1,
				cb: () => {
					dispatch(ability.thunk(slot, row, column));
				}
			}));
		});
		if (item.descriptors.indexOf('weapon') !== -1) {
			result.push({
				name: name + ' (Attack)',
				range: item.range || 1,
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
		playerResources: room.gameState.playerResources,
		knockedDownCharacters: room.gameState.knockedDownCharacters,
		positions: room.gameState.positions,
		monsterSize: room.gameState.monsterStats.size
	}),
	(dispatch) => ({
		moveCharacterDispatch: (character) => dispatch(moveCharacter(character)),
		startAttackDispatch:  (slot, weapon) => dispatch(startAttack(slot, weapon)),
		endSingleTurnDispatch: (data) => dispatch(endSingleTurn(data)),
		dispatch
	})
)(({ slot, room, board, user, playerResources, knockedDownCharacters, positions, monsterSize, endSingleTurnDispatch, moveCharacterDispatch, startAttackDispatch, dispatch }) => {
	if (slot === board.data.character && user.id === room[`Player${slot + 1}`].id) {
		const knockedDown = knockedDownCharacters[slot] !== STATUSES.standing;

		const rangeToMonster = getDistance(monsterSize, positions.monster, positions[`player${slot + 1}`]);

		let actionList = [];
		if (!knockedDown) {
			actionList = room.gameState.gear[slot].reduce((acc, data, row) => {
				const result = [...acc];
				data.map((name, column) => {
					buildButtonsForItem(name, result, slot, row, column, dispatch, startAttackDispatch);
				});
				return result;
			}, []);
		}

		buildButtonsForItem('Fist & Tooth', actionList, slot, -1, -1, dispatch, startAttackDispatch);
		return (
			<div className="col-md-7 col-sm-12 attack-buttons container-fluid">
				{ !knockedDown && playerResources.movements > 0 ? (
					<div className="col-md-6 col-sm-12">
						<button className="btn btn-primary btn-xs" onClick={() => moveCharacterDispatch(board.data)}>
							<img src="/static/movement-resource.png" />
							Move
						</button>
					</div>
				) : null }
				<div className="col-md-6 col-sm-12">
					<button className="btn btn-primary btn-xs" onClick={() => endSingleTurnDispatch(board.data)}>End Turn</button>
				</div>
				{actionList.map((action, i) => ((
					(playerResources.actions > 0 || !action.action) &&
					(playerResources.movements > 0 || !action.movement)
				) ? (
						<div key={i} className="col-md-12 col-sm-12">
							<button
								disabled={action.range < rangeToMonster}
								title={action.range < rangeToMonster ? 'Out of range' : null}
								className="btn btn-primary btn-xs"
								onClick={() => action.cb(slot)}
							>
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
