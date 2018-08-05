import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as appActions from '../actions/app-actions';

import * as icons from '../images/icons';
import * as music from '../audio/music';
import { Howl, Howler } from 'howler';

class Item extends Component {
	constructor(props) {
		super(props);

		this.executePayload = this.executePayload.bind(this);

		this.state = {
			payload: {},
		};
	}

	componentDidMount() {
		const { data, type } = this.props;

		if (!data.target) return false;

		if (type === 'lights') {
			return true;
		} else if (type === 'music') {
			this.setState({
				payload: new Howl({
					src: music[data.target],
					loop: true,
					preload: true,
				}),
			});
		}
	}

	componentDidUpdate() {
		const { payload } = this.state;

		if (!this.isActive()) {
			payload.stop();
		}
	}

	executePayload() {
		const { payload } = this.state;
		const { type, data } = this.props;

		if (type === 'lights') {
			return true;
		} else if (type === 'music') {
			if (this.isActive()) {
				payload.stop();
				appActions.setPlayingMusic(null);
			} else {
				Howler.volume(0.5);
				payload.play();
				appActions.setPlayingMusic(data.target);
			}
		}
	}

	isActive() {
		const { type, data, playing } = this.props;

		if (type === 'lights' || type === 'music') {
			return playing === data.target;
		} else if (type === 'environments' || type === 'sounds') {
			return playing.includes(data.target);
		}
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

Item.propTypes = {
	data: PropTypes.object.isRequired,
	type: PropTypes.string.isRequired,
};

const mapStateToProps = (store, props) => {
	const { type } = props;

	return {
		playing: store.appState.playing[type],
	};
};

export default connect(mapStateToProps)(Item);
