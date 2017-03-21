import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Collapsed } from './Collapsed';
import { Card } from './Card';

export class Character extends Component {
	constructor() {
		super();

		this.state = {
			fullCard: false
		};

		this.changeFullCard = this.changeFullCard.bind(this);
	}

	changeFullCard(e) {
		this.setState({
			fullCard: e.target.checked
		});
	}

	render() {
		return (
			<div>
				<input type="checkbox" checked={this.state.fullCard} onChange={this.changeFullCard} />
				<Collapsed slot={this.props.slot} />
				{this.state.fullCard ? <Card slot={this.props.slot} /> : null}
			</div>
		);
	}
}
