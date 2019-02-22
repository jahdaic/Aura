import React from 'react';
import { NavLink } from 'react-router-dom';
// import PlayPause from './play-pause';
import Mute from './mute';
import Volume from './volume';

import * as icons from '../../images/icons';

const Playbar = props => {
	return (
		<footer className="playbar row">
			{/* <div className="col-xs-2 col-sm-1">
				<PlayPause />
			</div> */}
			<div className="col-xs-2 col-sm-1">
				<Mute />
			</div>
			<div className="col-xs-8 col-sm-5 col-md-3 col-lg-3">
				<Volume channel="master" />
			</div>
			<div className="col-xs-2  col-sm-1 col-sm-offset-5 col-md-offset-6 col-lg-offset-7">
				<NavLink to="/settings">
					<img src={icons.settings} alt="Settings" />
				</NavLink>
			</div>
		</footer>
	);
};

export default Playbar;
