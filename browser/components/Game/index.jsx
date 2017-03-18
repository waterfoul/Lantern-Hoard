import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Character} from './Character';
import {Board} from './Board';
import {MonsterInfo} from './MonsterInfo';
import {fetch} from '../../reducers/room';


class GameComponent extends Component {
	componentWillMount() {
		this.props.fetch(this.props.match.params.id);
	}

	render() {
		return this.props.room ? (
			<div id="game">
				<div id="game-board-wrapper">
					<div>
						<div id="game-board"><Board /></div>
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
	{fetch}
)(GameComponent);
