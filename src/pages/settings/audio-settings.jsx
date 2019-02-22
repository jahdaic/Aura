import React from 'react';
import SettingsSection from '../../components/settings-section';
import Volume from '../../components/playbar/volume';

const AudioSettings = props => {
	return (
		<SettingsSection title="Audio Settings">
			<div className="row">
				<label className="col-xs-6">Master</label>
				<div className="col-xs-6">
					<Volume channel="master" />
				</div>
			</div>
			<div className="row">
				<label className="col-xs-6">Music</label>
				<div className="col-xs-6">
					<Volume channel="music" />
				</div>
			</div>
			<div className="row">
				<label className="col-xs-6">Environments</label>
				<div className="col-xs-6">
					<Volume channel="environments" />
				</div>
			</div>
			<div className="row">
				<label className="col-xs-6">Sounds</label>
				<div className="col-xs-6">
					<Volume channel="sounds" />
				</div>
			</div>
		</SettingsSection>
	);
};

export default AudioSettings;
