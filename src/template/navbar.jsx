import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = props => {
	return (
		<nav className="row center-xs">
			<NavLink to="/lights" isActive={props.location}>
				Lights
			</NavLink>

			<NavLink to="/music">
				Music
			</NavLink>

			<NavLink to="/environments">
				Environment
			</NavLink>

			<NavLink to="/sounds">
				Sounds
			</NavLink>
		</nav>
	);
};

export default Navbar;
