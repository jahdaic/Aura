import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SettingsSection from '../../components/settings-section';
import SelectBridge from './philips-hue-steps/1-select-bridge';
import AuthBridge from './philips-hue-steps/2-auth-bridge';
import Authorized from './philips-hue-steps/3-authorized';
import * as hueActions from '../../actions/hue-actions';

class PhilipsHueSettings extends Component {
	constructor(props) {
		super(props);

		this.renderStep = this.renderStep.bind(this);

		this.state = {};
	}

	componentDidMount() {
		const { authorized } = this.props;

		if ( authorized ) {
			hueActions.getLights();
			hueActions.setHueStep('authorized');
		} else {
			hueActions.setHueStep('select-bridge');
		}
	}

	renderStep() {
		const { step } = this.props;

		// return <AuthBridge />;

		switch ( step ) {
			case 'select-bridge':
				return <SelectBridge />;
			case 'auth-bridge':
				return <AuthBridge />;
			case 'authorized':
				return <Authorized />;
			default:
				return <SelectBridge />;
		}
	}

	render() {
		return <SettingsSection title="Philips Hue">{this.renderStep()}</SettingsSection>;
	}
}

PhilipsHueSettings.propTypes = {
	step: PropTypes.string.isRequired,
	authorized: PropTypes.bool.isRequired,
};

const mapStateToProps = store => {
	return {
		step: store.appState.hue.step,
		authorized: store.appState.hue.authorized,
	};
};

export default connect(mapStateToProps)(PhilipsHueSettings);
