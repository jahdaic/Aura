import React from 'react';

const SettingsSection = props => {
	const { children } = props;
	
	return (
		<div className="col-xs-12 col-sm-6 col-md-4">
			<div className="section">
				<h2>{ props.title }</h2>
				{children}
			</div>
		</div>
	);
};

export default SettingsSection;
