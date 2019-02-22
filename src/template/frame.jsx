import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const App = props => {
	const { children, theme } = props;

	return (
		<div className={`frame ${theme}`}>
			{children}
		</div>
	);
};

App.propTypes = {
	theme: PropTypes.string.isRequired,
};

const mapStateToProps = (store) => {
	return {
		theme: store.appState.settings.theme,
	};
};

export default connect(mapStateToProps)(App);
