import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as hueActions from '../../../actions/hue-actions';

// import { bridge1, bridge2 } from '../../../images/icons';

class AuthBridge extends Component {
	constructor(props) {
		super(props);

		this.tick = this.tick.bind(this);
		this.cancelAuthorization = this.cancelAuthorization.bind(this);

		this.state = {
			intervalHandle: null,
			secondsRemaining: hueActions.attemptLength - hueActions.interval,
			minutes: '00',
			seconds: hueActions.attemptLength, 
		}
	}

	componentDidMount() {
		const { ip } = this.props;

		this.setState({
			intervalHandle: setInterval( this.tick, 1000 )
		});

		hueActions
			.attemptAuthorization(ip)
			.then(username => {
				hueActions.authorize(username, ip);
				hueActions.getLights();
				hueActions.setHueStep('authorized');
			})
			.catch(msg => {
				console.warn(msg);
				hueActions.setHueStep('select-bridge');
			});
	}

	cancelAuthorization() {
		this.setState({
			minutes: '00',
			seconds: '00',
			secondsRemaining: 0
		});

		hueActions.setHueStep('select-bridge');
	}

	tick() {
		const { secondsRemaining, intervalHandle } = this.state;

		let min = Math.floor( secondsRemaining / 60 );
		let sec = secondsRemaining - ( min * 60 );

		this.setState({
			minutes: min,
			seconds: sec
		});

		if ( sec < 10 ) sec = "0" + sec;

		if ( min < 10 ) min = "0" + min;

		this.setState({
			minutes: min,
			seconds: sec,
			secondsRemaining: secondsRemaining - 1
		});

		if ( Number(min) === 0 && Number(sec) === 0 ) {
			clearInterval(intervalHandle);
		}
	}

	render() {
		const { minutes, seconds } = this.state;

		return (
			<div>
				<p>Press the button on your Philips Hue bridge:</p>

				<div className="countdown">{minutes}:{seconds}</div>

				<div className="row">
					<div className="col-xs-6">
						<svg width="100%" viewBox="0 0 32 32" preserveAspectRatio="xMidYMid meet">
							<g id="bridge1" fill="#ffffff">
								<path d="M16,21 C13.243,21 11,18.757 11,16 C11,13.243 13.243,11 16,11 C18.757,11 21,13.243 21,16 C21,18.757 18.757,21 16,21 M8.611,11.87 C8.06,11.87 7.611,11.423 7.611,10.87 C7.611,10.318 8.06,9.87 8.611,9.87 C9.164,9.87 9.611,10.318 9.611,10.87 C9.611,11.423 9.164,11.87 8.611,11.87 M7,17 C6.447,17 6,16.553 6,16 C6,15.447 6.447,15 7,15 C7.553,15 8,15.447 8,16 C8,16.553 7.553,17 7,17 M12.91,6.533 C13.463,6.533 13.91,6.98 13.91,7.533 C13.91,8.086 13.463,8.533 12.91,8.533 C12.357,8.533 11.91,8.086 11.91,7.533 C11.91,6.98 12.357,6.533 12.91,6.533 Z M16,13 C17.657,13 19,14.343 19,16 C19,17.657 17.657,19 16,19 C14.343,19 13,17.657 13,16 C13,14.343 14.343,13 16,13 Z M16,4 C9.4,4 4,9.4 4,16 C4,22.6 9.4,28 16,28 C22.6,28 28,22.6 28,16 C28,9.4 22.6,4 16,4"></path>
							</g>
						</svg>
					</div>

					<div className="col-xs-6">
						<svg width="100%" viewBox="0 0 32 32" preserveAspectRatio="xMidYMid meet">
							<g id="bridge2" fill="#ffffff">
								<path d="M22,8 C21.447,8 21,7.553 21,7 C21,6.447 21.447,6 22,6 C22.553,6 23,6.447 23,7 C23,7.553 22.553,8 22,8 Z M16,12 C18.209,12 20,13.791 20,16 C20,18.209 18.209,20 16,20 C13.791,20 12,18.209 12,16 C12,13.791 13.791,12 16,12 Z M16,22 C12.691,22 10,19.309 10,16 C10,12.691 12.691,10 16,10 C19.309,10 22,12.691 22,16 C22,19.309 19.309,22 16,22 M9,7 C9,6.447 9.447,6 10,6 C10.553,6 11,6.447 11,7 C11,7.553 10.553,8 10,8 C9.447,8 9,7.553 9,7 M16,6 C16.553,6 17,6.447 17,7 C17,7.553 16.553,8 16,8 C15.447,8 15,7.553 15,7 C15,6.447 15.447,6 16,6 M24,4 L8,4 C5.8,4 4,5.8 4,8 L4,24 C4,26.2 5.8,28 8,28 L24,28 C26.2,28 28,26.2 28,24 L28,8 C28,5.8 26.2,4 24,4"></path>
							</g>
						</svg>
					</div>
				</div>
				<button type="button" onClick={this.cancelAuthorization}>
					Cancel Authorization
				</button>
			</div>
		);
	}
}

AuthBridge.propTypes = {
	ip: PropTypes.string.isRequired,
};

const mapStateToProps = store => {
	return {
		ip: store.appState.hue.ip,
	};
};

export default connect(mapStateToProps)(AuthBridge);