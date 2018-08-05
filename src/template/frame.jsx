import React from 'react';
import Navbar from './navbar';
import Playbar from './playbar';

const App = props => {
	const { children } = props;

	return (
		<div className="frame">
			<Navbar />
			<div className="container">{children}</div>
			<Playbar />
		</div>
	);
};

export default App;
