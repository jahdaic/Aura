import React from 'react';
import { NavLink } from 'react-router-dom';
// import * as icons from '../images/icons';

const BackNavbar = props => {
	return (
		<nav className="backbar">
			<NavLink to="/music">
				&#8249; Back
			</NavLink>
		</nav>
	);
};

export default BackNavbar;
