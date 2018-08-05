import React, { Component } from 'react';
import logo from '../images/logo.svg';
import { Howler } from 'howler';

class Volume extends Component {
	constructor(props) {
		super(props);

		this.changeVolume = this.changeVolume.bind(this);

		this.state = {
			volume: 0.5,
		};
	}

	componentDidMount() {
		const { volume } = this.state;

		Howler.volume(volume);
	}

	changeVolume(ev) {
		Howler.volume(ev.target.value);

		this.setState({
			volume: ev.target.volume,
		});
	}

	render() {
		const { volume } = this.state;

		return (
			<span className="volume">
				<input
					type="range"
					value={volume}
					min="0"
					max="1"
					step="0.01"
					onChange={this.changeVolume}
				/>
			</span>
		);
	}
}

export default Volume;
