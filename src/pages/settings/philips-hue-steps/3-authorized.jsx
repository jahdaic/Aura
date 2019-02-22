import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as hueActions from '../../../actions/hue-actions';

class Authorized extends Component {
	constructor(props) {
		super(props);

		this.toggleLight = this.toggleLight.bind(this);
	}

	componentDidMount() {
		hueActions.getLights();
	}

	toggleLight(ev) {
		if( ev.target.checked ) {
			hueActions.addLight( ev.target.value );
		}
		else {
			hueActions.removeLight( ev.target.value );
		}
	}

	render() {
		const { lights, activeLights, hue } = this.props;

		console.log(hue, activeLights);

		return (
			<div>
				<p>Your Philips Hue is ready. Select the lights to use below:</p>
				{Object.keys(lights).map(id => (
					<div key={lights[id].uniqueid} className="row">
						<label className="col-xs-5">{lights[id].name}</label>
						<div className="col-xs-5 table-cell">
							<i>
								{ lights[id].state.mode === 'streaming' ? (<span className="pink">[In Use] </span>) : '' }
								{ !lights[id].capabilities.control.hasOwnProperty('colorgamut') ? (<span className="yellow">[Not Recommended]</span>) : '' }
							</i>
						</div>
						<div className="col-xs-2">
							{lights[id].state.mode !== 'streaming' ? (
								<input type="checkbox" value={id} checked={activeLights.includes(id)} onChange={this.toggleLight} />
							) : (
								''
							)}
						</div>
					</div>
				))}

				<button type="button" onClick={hueActions.getLights}>
					Refresh Lights
				</button>

				<button type="button" onClick={hueActions.revokeAuthorization}>
					Revoke Authorization
				</button>
			</div>
		);
	}
}

Authorized.propTypes = {
	hue: PropTypes.object.isRequired,
	lights: PropTypes.object.isRequired,
	activeLights: PropTypes.array.isRequired,
};

const mapStateToProps = store => {
	return {
		hue: store.appState.hue,
		lights: store.appState.hue.lights,
		activeLights: store.appState.hue.activeLights,
	};
};

export default connect(mapStateToProps)(Authorized);
