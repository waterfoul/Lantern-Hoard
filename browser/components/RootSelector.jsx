import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import {Lobby} from './Lobby';
import {Login} from './Login';

export const RootSelector = connect(
	({ auth }) => ({ user: auth })
)(
	({ user }) => (
		user ? (<Lobby />) : (<Login />)
	)
);
