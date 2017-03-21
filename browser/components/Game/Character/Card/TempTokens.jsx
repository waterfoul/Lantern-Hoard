import React from 'react';
import { connect } from 'react-redux';

export const TempTokens = connect(
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
			'minus damage',
			'minus luck',
			'minus movement',
			'insanity',
			'bleed'
		]
	})
)(({ tokens }) => (
	<div className="player-token-board-grid">
		<div>
			<img src="/static/gear-grid/temp-tokens.jpg" className="player-temp-tokens-image" />

			<div className="player-token-board-temp-tokens">
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
