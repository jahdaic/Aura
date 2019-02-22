import * as hueActions from '../actions/hue-actions';

const initialState = {
	debug: false,
	playState: 'play',
	sets: {
		lights: [
			{ name: 'Off', desc: '', target: 'off', icon: 'off' },
			{ name: 'On', desc: '', target: 'on', icon: 'off' },
			{ name: 'Forest', desc: '', target: 'forest', icon: 'leaf' },
			{ name: 'Volcano', desc: '', target: 'volcano', icon: 'fire' },
			{ name: 'Underwater', desc: '', target: 'water', icon: 'water' },
			// { name: 'Underground', target: '', icon: '' },
			// { name: 'Bright Day', target: '', icon: '' },
			// { name: 'Sunset', target: '', icon: '' },
			// { name: 'Night Outdoors', target: '', icon: '' },
			// { name: 'Haunted House', target: '', icon: 'house' },
		],
		music: [
			{ name: 'Off', desc: '', target: 'off', icon: 'off' },
			{ name: 'Forest', desc: 'Haunting', target: 'forest', icon: 'leaf' },
			{ name: 'Haunted House', desc: 'Music Box', target: 'hauntedHouse', icon: 'house' },
			{ name: 'Desert', desc: 'Guiter & Drum', target: 'desert', icon: 'pyramid' },
			{ name: 'Temple', desc: 'Chanting', target: 'temple', icon: 'tower' },
			{ name: 'Spooky', desc: 'Piano', target: 'spooky', icon: 'ghost' },
			{ name: 'Cave', desc: 'Slow', target: 'cave', icon: 'skull' },
		],
		environments: [
			{ name: 'Off', desc: '', target: 'off', icon: 'off' },
			{ name: 'Dripping', desc: 'Cave', target: 'drip', icon: 'water' },
			{ name: 'Birds', desc: 'Outdoors', target: 'birds', icon: '' },
			{ name: 'Swamp', desc: 'Cricket & Frog', target: 'swamp', icon: '' },
			{ name: 'Wind', desc: 'Constant', target: 'wind', icon: '' },
		],
		sounds: [
			{ name: 'Off', desc: '', target: 'off', icon: 'off' },
			{ name: 'Lava Splash', desc: 'Goopy', target: 'lava', icon: '' },
			{ name: 'Church Bell', desc: 'Single Long', target: 'bell', icon: 'bell' },
			{ name: 'Open Chest', desc: 'Creaky', target: 'chest', icon: '' },
			{ name: 'Door Open', desc: 'Normal', target: 'doorOpen', icon: 'door' },
			{ name: 'Door Close', desc: 'Normal', target: 'doorClose', icon: 'door' },
			{ name: 'Coins', desc: 'Several', target: 'coins', icon: 'door' },
			{ name: 'Magic Missile', desc: '3 Shots', target: 'magicMissile', icon: 'door' },
		],
	},
	playing: {
		lights: '',
		music: {},
		environments: {},
		sounds: {},
	},
	hue: {
		step: 'select-bridge',
		ip: null,
		authorized: false,
		username: '',
		activeBridge: '',
		activeLights: [],
		bridges: [],
		lights: [],
	},
	settings: {
		theme: 'pink',
		volume: {
			master: 0.5,
			music: 0.5,
			environments: 1,
			sounds: 1,
		},
	},
};

if (localStorage.getItem('hueUsername')) {
	initialState.hue.authorized = true;
	initialState.hue.username = localStorage.getItem('hueUsername') || '';
	initialState.hue.activeBridge = localStorage.getItem('hueBridge') || '';
	initialState.hue.activeLights = JSON.parse(localStorage.getItem('activeLights') || '[]');

	hueActions.setupAPI(initialState.hue.username, initialState.hue.activeBridge);
	hueActions.getLights();
}

const appReducer = function(state = initialState, action) {
	// Remember that state is immutable
	switch (action.type) {
		case 'SET_PLAYING_LIGHT':
			return { ...state, playing: { ...state.playing, lights: action.data } };
		case 'SET_PLAYING_MUSIC':
			action.payload.volume(state.settings.volume.music);
			return {
				...state,
				playing: { ...state.playing, music: { [action.target]: action.payload } },
			};
		case 'REMOVE_PLAYING_MUSIC':
			state.playing.music[action.target].unload();
			let { [action.target]: _, ...newMusic } = state.playing.music;
			return {
				...state,
				playing: { ...state.playing, music: newMusic },
			};
		case 'SET_MUSIC_OFF':
			if (Object.keys(state.playing.music).length)
				Object.values(state.playing.music).forEach(payload => payload.unload());
			return { ...state, playing: { ...state.playing, music: {} } };
		case 'SET_PLAYING_ENVIRONMENT':
			action.payload.volume(state.settings.volume.environments);
			return {
				...state,
				playing: {
					...state.playing,
					environments: {
						...state.playing.environments,
						[action.target]: action.payload,
					},
				},
			};
		case 'REMOVE_PLAYING_ENVIRONMENT':
			state.playing.environments[action.target].unload();
			let { [action.target]: __, ...newEnvironments } = state.playing.environments;
			return {
				...state,
				playing: { ...state.playing, environments: newEnvironments },
			};
		case 'SET_ENVIRONMENTS_OFF':
			if (Object.keys(state.playing.environments).length)
				Object.values(state.playing.environments).forEach(payload => payload.unload());
			return { ...state, playing: { ...state.playing, environments: {} } };
		case 'SET_PLAYING_SOUND':
			action.payload.volume(state.settings.volume.sounds);
			return {
				...state,
				playing: {
					...state.playing,
					sounds: { ...state.playing.sounds, [action.target]: action.payload },
				},
			};
		case 'REMOVE_PLAYING_SOUND':
			state.playing.sounds[action.target].unload();
			let { [action.target]: ___, ...newSounds } = state.playing.sounds;
			return {
				...state,
				playing: { ...state.playing, sounds: newSounds },
			};
		case 'SET_SOUNDS_OFF':
			if (Object.keys(state.playing.sounds).length)
				Object.values(state.playing.sounds).forEach(payload => payload.unload());
			return { ...state, playing: { ...state.playing, sounds: {} } };
		case 'TOGGLE_PLAY_PAUSE':
			return { ...state, playState: (state.playState === 'play') ? 'pause' : 'play' };
		case 'SET_VOLUME':
			if (action.channel !== 'master')
				Object.values(state.playing[action.channel]).forEach(payload =>
					payload.volume(action.level)
				);
			return {
				...state,
				settings: {
					...state.settings,
					volume: { ...state.settings.volume, [action.channel]: action.level },
				},
			};
		case 'SET_THEME':
			return { ...state, settings: { ...state.settings, theme: action.color } };
		case 'SET_HUE_STEP':
			return { ...state, hue: { ...state.hue, step: action.step } };
		case 'SET_BRIDGES':
			return { ...state, hue: { ...state.hue, bridges: action.data } };
		case 'SET_BRIDGE_IP':
			return { ...state, hue: { ...state.hue, ip: action.ip } };
		case 'SET_BRIDGE_AUTH':
			return {
				...state,
				hue: {
					...state.hue,
					authorized: true,
					username: action.username,
					activeBridge: action.bridge,
				},
			};
			case 'REVOKE_BRIDGE_AUTH':
			return {
				...state,
				hue: {
					...state.hue,
					authorized: false,
					username: '',
					activeBridge: '',
				},
			};
		case 'ADD_LIGHT':
			localStorage.setItem('activeLights', JSON.stringify(state.hue.activeLights.concat([action.light])));
			return { ...state, hue: { ...state.hue, activeLights: state.hue.activeLights.concat([action.light]) } };
		case 'REMOVE_LIGHT':
			localStorage.setItem('activeLights', JSON.stringify(state.hue.activeLights.filter(id => id !== action.light)));
			return { ...state, hue: { ...state.hue, activeLights: state.hue.activeLights.filter(id => id !== action.light) } };
		case 'SET_LIGHTS':
			return { ...state, hue: { ...state.hue, lights: action.data } };
		default:
			return state;
	}
};

export default appReducer;
