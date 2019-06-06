import React from 'react';
import SettingsSection from '../components/settings-section';
import PhilipsHueSettings from './settings/philips-hue-settings';
import AppSettings from './settings/app-settings';
import AudioSettings from './settings/audio-settings';
import FeedbackSettings from './settings/feedback-settings';

const Settings = props => {
	return (
		<div className="row">
			<SettingsSection title="About">
				<div className="row">
					<div className="col-xs-12">
						<p>
							This app was created by{' '}
							<a href="https://github.com/jahdaic">Jahdai Cintron</a>
							to help provide atmosphere when you are playing tabletop RPGs.
						</p>
						<p>
							It provides music, environmental sound loops and sound effects as well
							as integration with the{' '}
							<a href="https://amzn.to/2EqmcP6">Philips Hue</a> lighting system.
						</p>
						<p>
							This app is a very early build and none of the sounds, music or lighting
							effects are finalized or even very good. I'd appreciate any feedback or
							bugs reported.
						</p>
					</div>
				</div>
			</SettingsSection>
			<PhilipsHueSettings />
			<AppSettings />
			<AudioSettings />
			<FeedbackSettings />
		</div>
	);
};

export default Settings;
