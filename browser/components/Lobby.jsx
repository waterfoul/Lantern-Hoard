import React from 'react';
import {connect} from 'react-redux';

export const Lobby = connect(
	({ auth }) => ({ user: auth })
)(
	({ user }) => (
		<div>
			{JSON.stringify(user)}
			Hello!
		</div>
	)
);
