import React from 'react';
import {connect} from 'react-redux';
import {Character} from './Character';

export const Game = connect(
	({ auth }) => ({ user: auth })
)(
	({ user }) => (
		<div>
			<div id="game-board-wrapper" className="container-fluid">
				<div className="row no-gutters">
					<div id="game-board" className="col-md-10">
						<img src="/static/board.jpg" />
					</div>
					<div id="game-monster" className="col-md-2">
						<img src="/static/monster-info.jpg" />
					</div>
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
