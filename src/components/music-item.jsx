import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Item from './item';
import * as appActions from '../actions/app-actions';

class MusicItem extends Component {
	constructor(props) {
		super(props);

		this.executePayload = this.executePayload.bind(this);

		this.state = {};
	}

	executePayload() {
		const { data } = this.props;

		if (data.target === 'off') {
			appActions.musicOff();
		} else if (this.isActive()) {
			appActions.removePlayingMusic(data.target);
		} else {
			appActions.setPlayingMusic(data.target);
		}
	}

	isActive() {
		const { data, playing } = this.props;

		return data.target in playing;
	}

	render() {
		const { data } = this.props;

		if(data.target !== 'off')	data.icon = 'music';

		return <Item data={data} active={this.isActive()} payload={this.executePayload} />;
	}
}

MusicItem.propTypes = {
	data: PropTypes.object.isRequired,
};

const mapStateToProps = store => {
	return {
		playing: store.appState.playing.music,
	};
};

export default connect(mapStateToProps)(MusicItem);
