import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as appActions from '../../actions/app-actions';

import {play, pause} from '../../images/icons';

class PlayPause extends Component {
	constructor(props) {
		super(props);

		this.togglePlayState = this.togglePlayState.bind(this);

		this.state = {};
	}

	togglePlayState(ev) {
		appActions.togglePlayPause();
	}

	render() {
		const { playState } = this.props;

		return (
			<span className="play-pause">
				{
					(playState === 'play') ? 
					<img src={pause} className="pause" onClick={this.togglePlayState} alt="Pause" /> :
					<img src={play} className="play" onClick={this.togglePlayState} alt="Play" />
				}
			</span>
		);
	}
}

PlayPause.propTypes = {
	playState: PropTypes.string.isRequired,
};

const mapStateToProps = (store) => {
	return {
		playState: store.appState.playState,
	};
};

export default connect(mapStateToProps)(PlayPause);
