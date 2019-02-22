import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as appActions from '../../actions/app-actions';

class Volume extends Component {
	constructor(props) {
		super(props);

		this.updateVolume = this.updateVolume.bind(this);

		this.state = {};
	}

	componentDidMount() {
		const { channel, level } = this.props;

		appActions.setVolume( channel, level );
	}

	updateVolume(ev) {
		const { channel } = this.props;
		appActions.setVolume( channel, ev.target.value );		
	}

	render() {
		const { level } = this.props;

		return (
			<span className="volume">
				<input
					type="range"
					value={level}
					min="0"
					max="1"
					step="0.01"
					onChange={this.updateVolume}
				/>
			</span>
		);
	}
}

Volume.propTypes = {
	level: PropTypes.number.isRequired,
};

const mapStateToProps = (store, props) => {
	const { channel } = props;
	return {
		level: store.appState.settings.volume[ channel ],
	};
};

export default connect(mapStateToProps)(Volume);
