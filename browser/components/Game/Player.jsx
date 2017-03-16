import React from 'react';
import { connect } from 'react-redux';

export const Player = connect(
	() => ({
		playerGearState: {
			initialGear: {
				cloth: [2, 2],
				foundingStone: [3, 2]
			}
		}
	})
)(
	({ playerGearState }) => (
		<div>
			<div id="player-card-wrapper" className="container-fluid">
				<img src="/static/p1-gear.jpg" id="player-card-image" className="container-fluid" />
				<div id="player-gear-grid">
					<div className={[
						'player-gear-square',
						'geared',
						'x-' + playerGearState.initialGear.cloth[0],
						'y-' + playerGearState.initialGear.cloth[1]
					].join(' ')} />
					<div className={[
						'player-gear-square',
						'geared',
						'x-' + playerGearState.initialGear.foundingStone[0],
						'y-' + playerGearState.initialGear.foundingStone[1]
					].join(' ')} />
				</div>
			</div>
		</div>
	)
	);
