import React, {Component} from 'react';
import {connect} from 'react-redux';

import {Character} from './Character';
import {Board} from './Board';
import {MonsterInfo} from './MonsterInfo';

import {InitialPlacement} from './gameBoardOverlay/InitialPlacement';
import {MoveCharacter} from './gameBoardOverlay/MoveCharacter';
import {PlayerDamage} from './gameBoardOverlay/PlayerDamage';

import {fetch} from '../../reducers/room';
import {changeFixState} from '../../reducers/flexBoxFix';
import {listResult} from '../../reducers/roomList';
import {BOARD_STATUSES} from '../../../common/gameState/board';


class GameComponent extends Component {
	componentWillMount() {
		this.props.fetch(this.props.match.params.id);
		setTimeout(this.props.changeFixState, 100);
		setTimeout(this.props.changeFixState, 500);
		setTimeout(this.props.changeFixState, 1000);
		// clearing the room list so we don't need to keep it updated
		this.props.listResult(null);
	}

	getGameBoardOverlay() {
		if (this.props.room.gameState && this.props.room.gameState.board) {
			switch (this.props.room.gameState.board.status) {
			case BOARD_STATUSES.initialPlacement:
				return <InitialPlacement />;
			case BOARD_STATUSES.showAvailableMovement:
				return <MoveCharacter />;
			case BOARD_STATUSES.targetChoice:
				return <div className="game-board-grey-over"><div>Please select a target</div></div>;
			case BOARD_STATUSES.selectActingCharacter:
				return <div className="game-board-grey-over"><div>Please select a character to act</div></div>;
			case BOARD_STATUSES.playerDamage:
				return <PlayerDamage />;
			default:
				return null;
			}
		} else {
			return null;
		}
	}

	render() {
		return this.props.room && (
				<div id="game">
					<div id="game-board-wrapper">
						<div>
							<div id="game-board">
								<Board />
								<div id="game-board-status-overlay">
									{this.props.boardError && (<div id="game-board-error" className="game-board-grey-over"><div>{this.props.boardError}</div></div>)}
									{ this.getGameBoardOverlay() }
								</div>
							</div>
							<div id="game-monster"><MonsterInfo /></div>
						</div>
					</div>
					<div id="game-character-card-wrapper" className="container-fluid">
						<div id="game-character-card-1" className="col-md-3 col-sm-3"><Character slot={0} /></div>
						<div id="game-character-card-2" className="col-md-3 col-sm-3"><Character slot={1} /></div>
						<div id="game-character-card-3" className="col-md-3 col-sm-3"><Character slot={2} /></div>
						<div id="game-character-card-4" className="col-md-3 col-sm-3"><Character slot={3} /></div>
					</div>
				</div>
			);
	}
}

export const Game  = connect(
	({ room, boardError }) => ({ room, boardError }),
	{fetch, changeFixState, listResult}
)(GameComponent);
