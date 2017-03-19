import React from 'react';
import { connect } from 'react-redux';

export const TempTokens = connect(
	() => ({
		tokens: [
			'plus strength',
			'plus accuracy',
			'plus evasion',
			'Lunacy',
			'plus speed',
			'plus damage',
			'plus luck',
			'plus movement',
			'Bleed',
			'minus strength',
			'minus accuracy',
			'minus evasion',
			'Lunacy',
			'minus speed',
			'minus damage',
			'minus luck',
			'minus movement',
			'Bleed'
		]
	})
)(({ tokens }) => (
	<div className="player-token-board-grid">
		<div>
			<img src="/static/gear-grid/temp-tokens.jpg" className="player-tokens-image" />

			<div className="player-token-board-tokens">
				{tokens.map((token, i) => (<div key={i} className={[
					'token',
					`token-${i}`,
					token
				].join(' ')} />))}
			</div>
		</div>
	</div>
))
