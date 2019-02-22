import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as appActions from '../../actions/app-actions';

import {mute, volume1, volume2, volume3} from '../../images/icons';

class Mute extends Component {
	constructor(props) {
		super(props);

		this.toggleMute = this.toggleMute.bind(this);
		this.renderMuteIcon = this.renderMuteIcon.bind(this);

		this.state = {};
	}

	toggleMute(ev) {
		const { level } = this.props;
		const { lastLevel } = this.state;

		if( level > 0 )
		{
			this.setState({ lastLevel: level });
			appActions.setVolume( 'master', 0 );
		}
		else
		{
			appActions.setVolume( 'master', lastLevel );
		}
	}

	renderMuteIcon( level ) {
		
		if( level < 0.01 )
			return <img src={mute} className="mute" alt="Unmute" />
		else if( level > 0 && level < 0.4 )
			return <img src={volume1} className="volume1" alt="Mute" />
		else if( level >= 0.4 && level < 0.7 )
			return <img src={volume2} className="volume2" alt="Mute" />
		else
			return <img src={volume3} className="volume3" alt="Mute" />
	}

	render() {
		const { level } = this.props;

		return (
			<span className="mute" onClick={this.toggleMute}>
				{this.renderMuteIcon( level )}
			</span>
		);
	}
}

Mute.propTypes = {
	level: PropTypes.number.isRequired,
};

const mapStateToProps = (store) => {
	return {
		level: store.appState.settings.volume.master,
	};
};

export default connect(mapStateToProps)(Mute);
