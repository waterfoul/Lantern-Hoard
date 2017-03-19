import React from 'react';
import { connect } from 'react-redux';

export const TempTokens = connect(
	() => ({
		tokens: [
			'Strength',
			'Accuracy',
			'Evasion',
			'Lunacy',
			'Speed',
			'Damage',
			'Luck',
			'Movement',
			'Bleed'
		]
	})
)(({ tokens }) => (
	<div className="player-token-board-grid">
		<div>
			<img src="/static/gear-grid/temp-tokens.jpg" className="player-tokens-image" />

			<div id="player-token-board-tokens">
				{tokens.map(token => (null))}
			</div>
		</div>
	</div>
))
