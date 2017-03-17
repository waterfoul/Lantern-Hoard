import React, {Component} from 'react';
import {connect} from 'react-redux';

import {whoami} from '../reducers/auth';
import {fetchList} from '../reducers/roomList';

class RootComponent extends Component {
	componentWillMount() {
		this.props.whoami();
		this.props.fetchList();
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
	{whoami, fetchList}
)(RootComponent);
