import React from 'react';
import PhilipsHueSettings from './settings/philips-hue-settings';
import AppSettings from './settings/app-settings';
import AudioSettings from './settings/audio-settings';
import FeedbackSettings from './settings/feedback-settings';

const Settings = props => {
	return (
		<div className="row">
			<PhilipsHueSettings />
			<AppSettings />
			<AudioSettings />
			<FeedbackSettings />
		</div>
	);
}

export default Settings;
