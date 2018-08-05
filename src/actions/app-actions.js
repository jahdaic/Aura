// import axios from 'axios';
import store from '../store';

export function setPlayingLights(data = '') {
	store.dispatch({ type: 'SET_PLAYING_LIGHTS', data: data });
	return true;
}

export function setPlayingMusic(data = '') {
	store.dispatch({ type: 'SET_PLAYING_MUSIC', data: data });
	return true;
}

export function setPlayingEnvironments(data = '') {
	store.dispatch({ type: 'SET_PLAYING_ENVIRONMENTS', data: data });
	return true;
}

export function setPlayingSounds(data = '') {
	store.dispatch({ type: 'SET_PLAYING_SOUNDS', data: data });
	return true;
}
