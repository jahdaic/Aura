const initialState = {
	debug: false,
	sets: {
		lights: [
			{ name: 'Off', target: '', icon: '' },
			{ name: 'Forest', target: '', icon: '' },
			{ name: 'Volcano', target: '', icon: '' },
			{ name: 'Underground', target: '', icon: '' },
			{ name: 'Bright Day', target: '', icon: '' },
			{ name: 'Sunset', target: '', icon: '' },
			{ name: 'Night Outdoors', target: '', icon: '' },
			{ name: 'Underwater', target: '', icon: '' },
			{ name: 'Haunted House', target: '', icon: 'house' },
		],
		music: [
			{ name: 'Off', target: '', icon: '' },
			{ name: 'Forest', target: 'forest', icon: '' },
			{ name: 'Haunted House', target: 'hauntedHouse', icon: 'house' },
		],
		environments: [],
		sounds: [],
	},
	playing: {
		lights: null,
		music: null,
		environments: [],
		sounds: [],
	},
	// insert all app data here
};

const appReducer = function(state = initialState, action) {
	// Remember that state is immutable
	switch (action.type) {
		case 'SET_PLAYING_LIGHTS':
			return { ...state, playing: { ...state.playing, lights: action.data } };
		case 'SET_PLAYING_MUSIC':
			return { ...state, playing: { ...state.playing, music: action.data } };
		case 'SET_PLAYING_ENVIRONMENTS':
			return { ...state, playing: { ...state.playing, environments: action.data } };
		case 'SET_PLAYING_SOUNDS':
			return { ...state, playing: { ...state.playing, sounds: action.data } };
		default:
			return state;
	}
};

export default appReducer;
