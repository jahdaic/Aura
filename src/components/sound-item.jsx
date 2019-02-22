import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Item from './item';
import * as appActions from '../actions/app-actions';

class SoundItem extends Component {
	constructor(props) {
		super(props);

		this.executePayload = this.executePayload.bind(this);
		this.onFinishPlaying = this.onFinishPlaying.bind(this);

		this.state = {};
	}

	executePayload() {
		const { data } = this.props;

		if (data.target === 'off') {
			appActions.soundsOff();
		} else if (this.isActive()) {
			appActions.removePlayingSound(data.target);
		} else {
			appActions.setPlayingSound(data.target, this.onFinishPlaying);
		}
	}

	onFinishPlaying() {
		const { data } = this.props;

		appActions.removePlayingSound(data.target);
	}

	isActive() {
		const { data, playing } = this.props;

		return data.target in playing;
	}

	render() {
		const { data } = this.props;

		if(data.target !== 'off')	data.icon = 'megaphone';

		return <Item data={data} active={this.isActive()} payload={this.executePayload} />;
	}
}

SoundItem.propTypes = {
	data: PropTypes.object.isRequired,
};

const mapStateToProps = store => {
	return {
		playing: store.appState.playing.sounds,
	};
};

export default connect(mapStateToProps)(SoundItem);
