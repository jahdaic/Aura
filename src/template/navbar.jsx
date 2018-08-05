import React from 'react';
import logo from '../images/logo.svg';
import { NavLink } from 'react-router-dom';

const Navbar = props => {
	return (
		<nav className="menu">
			<ul>
				<li>
					<NavLink to="/lights">Lights</NavLink>
				</li>
				<li>
					<NavLink to="/music">Music</NavLink>
				</li>
				<li>
					<NavLink to="/environment">Environment</NavLink>
				</li>
				<li>
					<NavLink to="/sounds">Sounds</NavLink>
				</li>
			</ul>

			<div className="menu-right">
				<img src={logo} alt="Settings" />
			</div>
		</nav>
	);
};

export default Navbar;
