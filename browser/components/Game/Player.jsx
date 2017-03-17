import React from 'react';
import { connect } from 'react-redux';

export const Player = connect(
	() => ({
		playerGearState: {
			initialGear: {
				cloth: [1, 1],
				foundingStone: [2, 1]
			}
		}
	})
)(
	({ playerGearState }) => (
		<div>
			<div id="player-card-wrapper" className="container-fluid">
				<div className="row no-gutters">

					<div id="player-token-board" className="col-md-2">
						<img src="/static/gear-grid/tokens.jpg" id="player-tokens-image" />
					</div>

					<div id="player-armor-gear-wrapper" className="container-fluid">

						<div id="player-armor-board" className="col-md-10">
							<img src="/static/gear-grid/armor.jpg" id="player-armor-image" />
							boardState.monsterStats.waist }
							<div id="player-armor-board-container">
								<div className="player-armor-board-values head"><div>1</div></div>
								<div className="player-armor-board-values body"><div>2</div></div>
								<div className="player-armor-board-values waist"><div>3</div></div>
								<div className="player-armor-board-values hand"><div>4</div></div>
								<div className="player-armor-board-values foot"><div>5</div></div>
							</div>

							<div id="player-armor-wound-container">
								<div className="player-armor-wound-values head"><div>X</div></div>
							</div>

						</div>

						<div id="player-gear-grid" className="col-md-10">
							<div>
								<img src="/static/gear-grid/gear.jpg" id="player-gear-image" />
								<div id="player-gear-grid-items">
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
						</div> {/* */} {/*player-gear-grid*/}
					</div>

				</div>
			</div>
		</div>
	)
	);
