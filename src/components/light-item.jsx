import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Item from './item';
import * as appActions from '../actions/app-actions';
import * as hueActions from '../actions/hue-actions';

class LightItem extends Component {
	constructor(props) {
		super(props);

		this.executePayload = this.executePayload.bind(this);
	}

	componentDidMount() {
		const { data } = this.props;

		if (!data.target) return false;

		return false;
	}

	executePayload() {
		const { data, hue } = this.props;

		console.log(hue.lights);

		hueActions.setLightsToColor(hue.activeLights, data.target);

		appActions.setPlayingLight(data.target);
	}

	isActive() {
		const { data, playing } = this.props;

		return playing === data.target;
	}

	render() {
		const { data } = this.props;

		if(data.target !== 'off')	data.icon = 'light';

		return <Item data={data} active={this.isActive()} payload={this.executePayload} />;
	}
}

LightItem.propTypes = {
	data: PropTypes.object.isRequired,
	playing: PropTypes.string.isRequired,
	hue: PropTypes.object.isRequired,
};

const mapStateToProps = store => {
	return {
		playing: store.appState.playing.lights,
		hue: store.appState.hue,
	};
};

export default connect(mapStateToProps)(LightItem);
