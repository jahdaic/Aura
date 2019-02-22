import store from '../store';
import Hue from 'philips-hue';

export const hue = new Hue();
export const attemptLength = 60; // seconds
export const interval = 2; // seconds
let attempts = attemptLength / interval;

export function setupAPI(username, bridge) {
	hue.username = username;
	hue.bridge = bridge;
}

export function setHueStep(step = '') {
	store.dispatch({ type: 'SET_HUE_STEP', step });
	return true;
}

export function getBridges() {
	return hue
		.getBridges()
		.then(bridges => {
			store.dispatch({ type: 'SET_BRIDGES', data: bridges });
			return Promise.resolve();
		})
		.catch(function(err) {
			console.error(err.stack || err);
		});
}

export function setBridgeIP(ip = '') {
	store.dispatch({ type: 'SET_BRIDGE_IP', ip });
	return true;
}

export function attemptAuthorization(bridge) {
	attempts = attemptLength / interval;

	return new Promise((resolve, reject) => {
		return checkAuthorization(bridge, resolve, reject);
	});
}

export function checkAuthorization(bridge, resolve, reject) {
	return hue
		.auth(bridge)
		.then( username => resolve(username) )
		.catch(function(err) {
			console.error(err.stack || err, attempts, resolve, reject);

			if (attempts > 1) {
				attempts--;
				setTimeout(checkAuthorization, interval * 1000, bridge, resolve, reject);
			} else {
				return reject('Bridge not authorized in time');
			}
		});
}

export function authorize(username = '', bridge = '') {
	localStorage.setItem('hueUsername', username);
	localStorage.setItem('hueBridge', bridge);
	setupAPI(username, bridge);
	store.dispatch({ type: 'SET_BRIDGE_AUTH', username, bridge });
}

export function revokeAuthorization() {
	localStorage.removeItem('hueUsername');
	localStorage.removeItem('hueBridge');
	localStorage.removeItem('activeLights');
	store.dispatch({ type: 'REVOKE_BRIDGE_AUTH' });
	setHueStep('select-bridge');
}

export function getLights() {
	return hue.getLights().then(lights => store.dispatch({ type: 'SET_LIGHTS', data: lights }));
}

export function addLight(light = 0) {
	// localStorage.setItem('hueBridge', bridge);
	store.dispatch({ type: 'ADD_LIGHT', light });
}

export function removeLight(light = 0) {
	// localStorage.setItem('hueBridge', bridge);
	store.dispatch({ type: 'REMOVE_LIGHT', light });
}

export function setLightsToColor(lights, color) {
	if (typeof color === 'object') {
		lights.forEach(light => {
			hue.light(light).on();
			hue.light(light).setState(color);
		});
	} else if (typeof color === 'function') {
		color(lights);
	}
}

// Custom light settings

const off = lights => {
	lights.forEach(light => {
		hue.light(light).off();
	});
};

export const lights = {
	off: off,
	on: { hue: 0, sat: 0, bri: 254 },
	forest: { hue: 25500, sat: 254, bri: 254 },
	volcano: { hue: 65535, sat: 254, bri: 254 },
	water: { hue: 46920, sat: 254, bri: 254 },
};
