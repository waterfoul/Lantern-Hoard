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
				<div className="row no-gutters">
					<div id="player-gear-board" className="col-md-2">
						<img src="/static/gear-grid/tokens.jpg" id="player-gear-image" className="container-fluid" />
					</div>
					<div id="player-armor-gear-wrapper" className="container-fluid">
						<div id="player-gear-board" className="col-md-10">
							<img src="/static/gear-grid/armor.jpg" id="player-gear-image" className="container-fluid" />
						</div>
						<div id="player-gear-grid" className="col-md-10">
							<img src="/static/gear-grid/gear.jpg" id="player-gear-image" className="container-fluid" />
						</div> {/* */} {/*armor-gear-wrapper*/}
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
			</div>
		</div>
	)
	);
