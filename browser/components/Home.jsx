import React from 'react';
import {connect} from 'react-redux';

export const Home = connect(
	({ auth }) => ({ user: auth })
) (
	({ user, children }) => (
		<div>
			Hello!
		</div>
	)
);
