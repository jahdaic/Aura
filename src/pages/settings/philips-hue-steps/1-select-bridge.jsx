import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as hueActions from '../../../actions/hue-actions';

class SelectBridge extends Component {
	constructor(props) {
		super(props);

		this.authBridge = this.authBridge.bind(this);
	}

	componentDidMount() {
		hueActions.getBridges();
	}

	authBridge(ev) {
		hueActions.setBridgeIP(ev.target.value);
		hueActions.setHueStep('auth-bridge');
	}

	render() {
		const { hue } = this.props;

		return (
			<div>
				<div className="row">
					<div className="col-xs-12">
						<p>Select your Philips Hue bridge to connect your lights:</p>
					</div>
				</div>

				{hue.bridges.map(bridge => (
					<div key={bridge} className="row">
						<label className="col-xs-4">{bridge}</label>
						<div className="col-xs-4" />
						<div className="col-xs-4">
							<button type="button" value={bridge} onClick={this.authBridge}>
								Authorize
							</button>
						</div>
					</div>
				))}

				<div className="row">
					<div className="col-xs-4">
						<input type="text" placeholder="0.0.0.0" />
					</div>
					<div className="col-xs-4" />
					<div className="col-xs-4">
						<button type="button" value={''} onClick={this.authBridge}>
							Authorize
						</button>
					</div>
				</div>

				<div className="row center-xs">
					<div className="col-xs-6">
						<button type="button" onClick={hueActions.getBridges}>
							Refresh List
						</button>
					</div>
				</div>
			</div>
		);
	}
}

SelectBridge.propTypes = {
	hue: PropTypes.object.isRequired,
};

const mapStateToProps = store => {
	return {
		hue: store.appState.hue,
	};
};

export default connect(mapStateToProps)(SelectBridge);
