import store from '../store';
import { Howler, Howl } from 'howler';

import * as music from '../audio/music';
import * as environments from '../audio/environments';
import * as sounds from '../audio/sounds';

export function setPlayingLight(data = '') {
	store.dispatch({ type: 'SET_PLAYING_LIGHT', data: data });
	return true;
}

export function setPlayingMusic(target = '') {
	musicOff();

	const payload = new Howl({
		src: music[target],
		loop: true,
		preload: true,
	});

	store.dispatch({ type: 'SET_PLAYING_MUSIC', target, payload });

	payload.play();

	return true;
}

export function removePlayingMusic(target = '') {
	store.dispatch({ type: 'REMOVE_PLAYING_MUSIC', target });
	return true;
}

export function musicOff() {
	store.dispatch({ type: 'SET_MUSIC_OFF' });
	return true;
}

export function setPlayingEnvironment(target = '') {
	const payload = new Howl({
		src: environments[target],
		loop: true,
		preload: true,
	});

	store.dispatch({ type: 'SET_PLAYING_ENVIRONMENT', target, payload });

	payload.play();

	return true;
}

export function removePlayingEnvironment(target = '') {
	store.dispatch({ type: 'REMOVE_PLAYING_ENVIRONMENT', target });
	return true;
}

export function environmentsOff() {
	store.dispatch({ type: 'SET_ENVIRONMENTS_OFF' });
	return true;
}

export function setPlayingSound(target = '', onFinish = () => {}) {
	const payload = new Howl({
		src: sounds[target],
		loop: false,
		preload: true,
		onend: onFinish,
	});

	store.dispatch({ type: 'SET_PLAYING_SOUND', target, payload });

	payload.play();

	return true;
}

export function removePlayingSound(target = '') {
	store.dispatch({ type: 'REMOVE_PLAYING_SOUND', target });
	return true;
}

export function soundsOff() {
	store.dispatch({ type: 'SET_SOUNDS_OFF' });
	return true;
}

export function togglePlayPause() {
	store.dispatch({ type: 'TOGGLE_PLAY_PAUSE' });
}

export function setVolume(channel = 'master', level = 0.5) {
	if (channel === 'master') Howler.volume(level);

	store.dispatch({ type: 'SET_VOLUME', channel, level });

	return true;
}

export function setTheme(color = 'pink') {
	store.dispatch({ type: 'SET_THEME', color });
}
