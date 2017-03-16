import React, {Component} from 'react';
import {connect} from 'react-redux';

import {whoami} from '../reducers/auth';

class RootComponent extends Component {
	componentWillMount() {
		this.props.whoami();
	}

	render () {
		return (
			<div>
				{this.props.children}
			</div>
		);
	}
}

export const Root = connect(
	null,
	{whoami}
)(RootComponent);
