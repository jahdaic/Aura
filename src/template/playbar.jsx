import React from 'react';
import logo from '../images/logo.svg';
import Volume from '../components/volume';

const Playbar = props => {
	return (
		<div className="playbar">
			<img src={logo} className="play" alt="Play/Pause" />
			<Volume />
		</div>
	);
};

export default Playbar;
