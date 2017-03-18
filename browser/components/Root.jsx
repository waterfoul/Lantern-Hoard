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
				{console.log(this.props.children)}
				{this.props.children}
			</div>
		);
	}
}

export const Root = connect(
	null,
	{whoami, fetchList}
)(RootComponent);
