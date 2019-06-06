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
		.then(username => resolve(username))
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

export function rgbToXY(r, g, b) {
	// Apply a gamma correction to the RGB values, which makes the color more vivid and more the like the color displayed on the screen of your device
	r = r > 0.04045 ? Math.pow((r + 0.055) / (1.0 + 0.055), 2.4) : r / 12.92;
	g = g > 0.04045 ? Math.pow((g + 0.055) / (1.0 + 0.055), 2.4) : g / 12.92;
	b = b > 0.04045 ? Math.pow((b + 0.055) / (1.0 + 0.055), 2.4) : b / 12.92;

	// RGB values to XYZ using the Wide RGB D65 conversion formula
	const X = r * 0.664511 + g * 0.154324 + b * 0.162028;
	const Y = r * 0.283881 + g * 0.668433 + b * 0.047685;
	const Z = r * 0.000088 + g * 0.07231 + b * 0.986039;

	// Calculate the xy values from the XYZ values
	let x = Number((X / (X + Y + Z)).toFixed(4));
	let y = Number((Y / (X + Y + Z)).toFixed(4));

	if (isNaN(x)) {
		x = 0;
	}
	if (isNaN(y)) {
		y = 0;
	}

	return [x, y];
}

export function setLightsToColor(lights, formula) {
	console.log(formula, lights, formulas[formula]);

	if (lights.length) {
		formulas[formula].effect(lights, formulas[formula].params);
	}
}

// Custom light settings

const off = lights => {
	lights.forEach(light => {
		hue.light(light).off();
	});
};

const solid = (lights, params) => {
	const defaults = {
		on: true,
		effect: 'none',
		// colormode: 'xy',
	};

	lights.forEach(light => {
		console.log(light, Object.assign(defaults, params), hue.light(light));
		hue.light(light).setState( Object.assign(defaults, params) );
	});
};

/**
 * SDistributes an array of colors evenly among all active lights
 * @param {*} lights
 * @param {*} params
 */
const multi = (lights, params) => {
	let current = 0;

	lights.forEach(light => {
		solid([light], { xy: params.xy[current] });

		current++;
		if (current >= params.length) current = 0;
	});
};

const strobe = (lights, params) => {
	solid(lights, params);
	// effect: colorloop
	// lights.forEach(light => {
	// 	solid([light], { xy: params.xy[current] });
	// });
};

const random = (lights, params) => {
	lights.forEach(light => {
		hue.light(light).on();
		hue.light(light).setState(params);
	});
};

export const formulas = {
	off: { effect: off },
	on: { effect: solid, params: { hue: 0, sat: 0, bri: 254 } },
	candles: { effect: random, params: {} },
	forest: { effect: solid, params: { xy: rgbToXY(101, 183, 29) } },
	volcano: { effect: strobe, params: { xy: rgbToXY(255, 53, 17) } },
	water: { effect: solid, params: { xy: rgbToXY(40, 119, 255) } },
	night: { effect: solid, params: { xy: rgbToXY(0, 0, 0) } },
	sunny: { effect: solid, params: { xy: rgbToXY(255, 255, 255) } },
	sunset: {
		effect: multi,
		params: { xy: [rgbToXY(101, 183, 29), rgbToXY(255, 53, 17), rgbToXY(40, 119, 255)] },
	},
	rainbow: { effect: solid, params: { effect: 'colorloop' } },
};
