import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SettingsSection from '../../components/settings-section';
import * as appActions from '../../actions/app-actions';

class AppSettings extends Component {
	constructor(props) {
		super(props);

		this.setThemeColor = this.setThemeColor.bind(this);

		this.state = {};
	}

	setThemeColor(ev) {
		appActions.setTheme(ev.target.value);
	}

	render() {
		const { theme } = this.props;
		return (
			<SettingsSection title="Application Settings">
				<div className="row">
					<label className="col-xs-6">Theme Color</label>
					<div className="col-xs-6">
						<select value={theme} onChange={this.setThemeColor}>
							<option value="pink">Pink (default)</option>
							<option value="blue">Blue</option>
							<option value="green">Green</option>
							<option value="yellow">Yellow</option>
							<option value="purple">Purple</option>
						</select>
					</div>
				</div>
			</SettingsSection>
		);
	}
}

AppSettings.propTypes = {
	theme: PropTypes.string.isRequired,
};

const mapStateToProps = store => {
	return {
		theme: store.appState.settings.theme,
	};
};

export default connect(mapStateToProps)(AppSettings);
