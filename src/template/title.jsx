import React from 'react';

const Title = props => {
	const { children } = props;

	return (
		<h1>
			{children}
		</h1>
	);
};

export default Title;
