import React from 'react';
import {logout} from '../reducers/auth';
import {connect} from 'react-redux';

export const Logout = connect(null, { logoutEvent: logout })(({logoutEvent}) => (
	<div id="logout-button">
		<button type="button" className="btn btn-primary" onClick={logoutEvent}>Logout</button>
	</div>
));
