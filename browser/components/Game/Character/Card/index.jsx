import React from 'react';
import { connect } from 'react-redux';

export const Card = connect(
	() => ({
		playerTokenState: {
			initialState: {
				token1: [1, 1],
				token2: [2, 1],
				token3: [1, 2],
				token4: [2, 2],
				token5: [1, 3],
				token6: [2, 3],
				token7: [1, 4],
				token8: [2, 4],
				token9: [1, 5],
				token10: [2, 5],
				token11: [1, 6],
				token12: [2, 6],
				token13: [1, 7],
				token14: [2, 7],
				token15: [1, 8],
				token16: [2, 8],
				token17: [1, 9],
				token18: [2, 9]

			}
		},
		playerGearState: {
			initialState: {
				cloth: [1, 1],
				foundingStone: [2, 1]
			}
		},
		playerArmorState: {
			initialState: {
				head: 0,
				body: 0,
				waist: 1,
				hand: 0,
				foot: 0
			}
		},
		playerInjuryState: { // not sure if this is the best way
			initialState: {
				// head: [null],
				// body: [null, null],
				// waist: [null, null],
				// hand: [null, null],
				// foot: [null, null]

				head: '',
				bodyL: '',
				bodyH: '',
				waistL: '',
				waistH: '',
				handL: '',
				handH: '',
				footL: '',
				footH: ''

				//// to test alignment
				// head: 'X',
				// bodyL: 'X',
				// bodyH: 'X',
				// waistL: 'X',
				// waistH: 'X',
				// handL: 'X',
				// handH: 'X',
				// footL: 'X',
				// footH: 'X'
			}
		}
	})
)(
	({ playerTokenState, playerArmorState, playerInjuryState, playerGearState }) => (
		<div>
			<div className="container-fluid character-card-wrapper">

				<div id="player-token-board-grid" className="col-md-2">
					<div>
						<img src="/static/gear-grid/tokens.jpg" id="player-tokens-image" />

						<div id="player-token-board-tokens">
							<div className={[
								'player-token-circle',
								'tokened',
								'x-' + playerTokenState.initialState.token1[0],
								'y-' + playerTokenState.initialState.token1[1]
							].join(' ')} />
							<div className={[
								'player-token-circle',
								'tokenedX',
								'x-' + playerTokenState.initialState.token2[0],
								'y-' + playerTokenState.initialState.token2[1]
							].join(' ')} />
							<div className={[
								'player-token-circle',
								'tokened',
								'x-' + playerTokenState.initialState.token3[0],
								'y-' + playerTokenState.initialState.token3[1]
							].join(' ')} />
							<div className={[
								'player-token-circle',
								'tokened',
								'x-' + playerTokenState.initialState.token4[0],
								'y-' + playerTokenState.initialState.token4[1]
							].join(' ')} />
							<div className={[
								'player-token-circle',
								'tokened',
								'x-' + playerTokenState.initialState.token5[0],
								'y-' + playerTokenState.initialState.token5[1]
							].join(' ')} />
							<div className={[
								'player-token-circle',
								'tokened',
								'x-' + playerTokenState.initialState.token6[0],
								'y-' + playerTokenState.initialState.token6[1]
							].join(' ')} />
							<div className={[
								'player-token-circle',
								'tokened',
								'x-' + playerTokenState.initialState.token7[0],
								'y-' + playerTokenState.initialState.token7[1]
							].join(' ')} />
							<div className={[
								'player-token-circle',
								'tokened',
								'x-' + playerTokenState.initialState.token8[0],
								'y-' + playerTokenState.initialState.token8[1]
							].join(' ')} />
							<div className={[
								'player-token-circle',
								'tokened',
								'x-' + playerTokenState.initialState.token9[0],
								'y-' + playerTokenState.initialState.token9[1]
							].join(' ')} />
							<div className={[
								'player-token-circle',
								'tokened',
								'x-' + playerTokenState.initialState.token10[0],
								'y-' + playerTokenState.initialState.token10[1]
							].join(' ')} />
							<div className={[
								'player-token-circle',
								'tokened',
								'x-' + playerTokenState.initialState.token11[0],
								'y-' + playerTokenState.initialState.token11[1]
							].join(' ')} />


						</div>
					</div>
				</div>

				<div id="player-armor-gear-wrapper" className="container-fluid col-md-10" >

					<div id="player-armor-board" className="col-md-10">
						<img src="/static/gear-grid/armor.jpg" id="player-armor-image" />
						<div id="player-armor-board-container">
							<div className="player-armor-board-values head"><div>{playerArmorState.initialState.head}</div></div>
							<div className="player-armor-board-values body"><div>{playerArmorState.initialState.body}</div></div>
							<div className="player-armor-board-values waist"><div>{playerArmorState.initialState.waist}</div></div>
							<div className="player-armor-board-values hand"><div>{playerArmorState.initialState.hand}</div></div>
							<div className="player-armor-board-values foot"><div>{playerArmorState.initialState.foot}</div></div>
						</div>

						<div id="player-armor-wound-container">
							<div className="player-armor-wound-values head"><div>{playerInjuryState.initialState.head}</div></div>
							<div className="player-armor-wound-values body-L"><div>{playerInjuryState.initialState.bodyL}</div></div>
							<div className="player-armor-wound-values body-H"><div>{playerInjuryState.initialState.bodyH}</div></div>
							<div className="player-armor-wound-values waist-L"><div>{playerInjuryState.initialState.waistL}</div></div>
							<div className="player-armor-wound-values waist-H"><div>{playerInjuryState.initialState.waistH}</div></div>
							<div className="player-armor-wound-values hand-L"><div>{playerInjuryState.initialState.handL}</div></div>
							<div className="player-armor-wound-values hand-H"><div>{playerInjuryState.initialState.handH}</div></div>
							<div className="player-armor-wound-values foot-L"><div>{playerInjuryState.initialState.footL}</div></div>
							<div className="player-armor-wound-values foot-H"><div>{playerInjuryState.initialState.footH}</div></div>

						</div>

					</div>

					<div id="player-gear-grid" className="col-md-10">
						<div>
							<img src="/static/gear-grid/gear.jpg" id="player-gear-image" />

							<div id="player-gear-grid-items">
								<div className={[
									'player-gear-square',
									'geared',
									'x-' + playerGearState.initialState.cloth[0],
									'y-' + playerGearState.initialState.cloth[1]
								].join(' ')} />
								<div className={[
									'player-gear-square',
									'geared',
									'x-' + playerGearState.initialState.foundingStone[0],
									'y-' + playerGearState.initialState.foundingStone[1]
								].join(' ')} />
							</div>
						</div>
					</div> {/* */} {/*player-gear-grid*/}
				</div>

			</div>
		</div>
	)
	);
