import React, {Component} from 'react';
import {connect} from 'react-redux';

import {Character} from './Character';
import {Board} from './Board';
import {MonsterInfo} from './MonsterInfo';

import {InitialPlacement} from './gameBoardOverlay/InitialPlacement';

import {fetch} from '../../reducers/room';
import {changeFixState} from '../../reducers/flexBoxFix';
import {BOARD_STATUSES} from '../../reducers/gameState/board';


class GameComponent extends Component {
	componentWillMount() {
		this.props.fetch(this.props.match.params.id);
		setTimeout(this.props.changeFixState, 100);
		setTimeout(this.props.changeFixState, 500);
		setTimeout(this.props.changeFixState, 1000);
	}

	getGameBoardOverlay() {
		if (this.props.room.gameState && this.props.room.gameState.board) {
			switch (this.props.room.gameState.board.status) {
			case BOARD_STATUSES.initialPlacement:
				return <InitialPlacement />;
			default:
				return null;
			}
		} else {
			return null;
		}
	}

	render() {
		return this.props.room ? (
				<div id="game">
					<div id="game-board-wrapper">
						<div>
							{this.props.boardError && (<div id="game-board-error"><div>{this.props.boardError}</div></div>)}
							<div id="game-board">
								<Board />
								<div id="game-board-status-overlay">
									{ this.getGameBoardOverlay() }
								</div>
							</div>
							<div id="game-monster"><MonsterInfo /></div>
						</div>
					</div>
					<div id="game-character-card-wrapper" className="container-fluid">
						<div id="game-character-card-1" className="col-md-3"><Character slot={0} /></div>
						<div id="game-character-card-2" className="col-md-3"><Character slot={1} /></div>
						<div id="game-character-card-3" className="col-md-3"><Character slot={2} /></div>
						<div id="game-character-card-4" className="col-md-3"><Character slot={3} /></div>
					</div>
				</div>
			) : null;
	}
}

export const Game  = connect(
	({ room }) => ({ room }),
	{fetch, changeFixState}
)(GameComponent);
