import React from 'react';
import {connect} from 'react-redux';
import {Character} from './Character';
import {Board} from './Board';
import {MonsterInfo} from './MonsterInfo';

export const Game = connect(
	({ auth }) => ({ user: auth })
)(
	({ user }) => (
		<div id="game">
			<div id="game-board-wrapper">
				<div>
					<div id="game-board"><Board /></div>
					<div id="game-monster"><MonsterInfo /></div>
				</div>
			</div>
			<div id="game-character-card-wrapper" className="container-fluid">
				<div id="game-character-card-1" className="col-md-3"><Character /></div>
				<div id="game-character-card-2" className="col-md-3"><Character /></div>
				<div id="game-character-card-3" className="col-md-3"><Character /></div>
				<div id="game-character-card-4" className="col-md-3"><Character /></div>
			</div>
		</div>
	)
);
