import React from 'react';
import { connect } from 'react-redux';

export const GearTokens = connect(
	() => ({
		tokens: [
			'plus strength',
			'plus accuracy',
			'plus evasion',
			'plus speed',
			'plus damage',
			'plus luck',
			'plus movement',
			'insanity',
			'bleed',
			'minus strength',
			'minus accuracy',
			'minus evasion',
			'minus speed',
			'minus damage'
		]
	})
)(({ tokens }) => (
	<div className="player-token-board-grid">
		<div>
			<img src="/static/gear-grid/gear-tokens.jpg" className="player-gear-tokens-image" />

			<div className="player-token-board-gear-tokens">
				{tokens.map((token, i) => (<div
key={i} className={[
	'token',
	`token-${i}`,
	token
].join(' ')} />))}
			</div>
		</div>
	</div>
));
