import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as bowser from 'bowser';

let errMsg = null;

if (bowser.chrome && parseFloat(bowser.version) < 57) {
	errMsg = 'You must update your version of chrome to at least version 57';
} else if (bowser.firefox && parseFloat(bowser.version) < 52) {
	errMsg = 'You must update your version of firefox to at least version 52';
} else if (bowser.msie) {
	alert('IE is completely unsupported, please download firefox or chrome');
} else if (bowser.edge) {
	errMsg = 'Edge is completely unsupported, please download firefox or chrome';
}

import {whoami} from '../reducers/auth';
import {fetchList} from '../reducers/roomList';

class RootComponent extends Component {
	componentWillMount() {
		this.props.whoami();
		this.props.fetchList();
	}

	render () {
		if (errMsg) {
			return (
				<div id="blocking-error">
					{errMsg}
				</div>
			);
		} else {
			return (
				<div>
					{this.props.children}
				</div>
			);
		}
	}
}

export const Root = connect(
	null,
	{whoami, fetchList}
)(RootComponent);
