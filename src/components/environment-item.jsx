import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Item from './item';
import * as appActions from '../actions/app-actions';

class EnvironmentItem extends Component {
	constructor(props) {
		super(props);

		this.executePayload = this.executePayload.bind(this);

		this.state = {};
	}

	executePayload() {
		const { data } = this.props;

		if (data.target === 'off') {
			appActions.environmentsOff();
		} else if (this.isActive()) {
			appActions.removePlayingEnvironment(data.target);
		} else {
			appActions.setPlayingEnvironment(data.target);
		}
	}

	isActive() {
		const { data, playing } = this.props;

		return data.target in playing;
	}

	render() {
		const { data } = this.props;

		if(data.target !== 'off')	data.icon = 'clock';

		return <Item data={data} active={this.isActive()} payload={this.executePayload} />;
	}
}

EnvironmentItem.propTypes = {
	data: PropTypes.object.isRequired,
};

const mapStateToProps = store => {
	return {
		playing: store.appState.playing.environments,
	};
};

export default connect(mapStateToProps)(EnvironmentItem);
