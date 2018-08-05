import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as appActions from '../actions/app-actions';

import * as icons from '../images/icons';
import * as music from '../audio/music';
import { Howl } from 'howler';

class MusicItem extends Component {
	constructor(props) {
		super(props);

		this.executePayload = this.executePayload.bind(this);

		this.state = {
			payload: null,
		};
	}

	componentDidMount() {
		const { data, type } = this.props;

		if (!data.target) return false;

		this.setState({
			payload: new Howl({
				src: music[data.target],
				loop: true,
				preload: true,
			}),
		});
	}

	componentDidUpdate() {
		const { payload } = this.state;

		if (payload && !this.isActive() && payload.playing()) payload.stop();
	}

	executePayload() {
		const { payload } = this.state;
		const { data } = this.props;

		if (this.isActive()) {
			payload.stop();
			appActions.setPlayingMusic(null);
		} else {
			payload.play();
			appActions.setPlayingMusic(data.target);
		}
	}

	isActive() {
		const { data, playing } = this.props;

		return playing === data.target;
	}

	render() {
		const { data } = this.props;

		return (
			<div
				className={`item ${this.isActive() ? 'active' : ''}`}
				onClick={this.executePayload}
			>
				<div className="item-icon">
					<img src={data.icon ? icons[data.icon] : icons.generic} alt={data.name} />
				</div>
				<div className="item-text">{data.name}</div>
			</div>
		);
	}
}

MusicItem.propTypes = {
	data: PropTypes.object.isRequired,
};

const mapStateToProps = (store, props) => {
	return {
		playing: store.appState.playing.music,
	};
};

export default connect(mapStateToProps)(MusicItem);
