import React from 'react';
import SettingsSection from '../../components/settings-section';

const FeedbackSettings = props => {
	return (
		<SettingsSection title="Feedback">
			<div className="row">
				<label className="col-xs-6">Name</label>
				<input type="text" className="col-xs-6" name="name" />
			</div>
			<div className="row">
				<label className="col-xs-6">Email</label>
				<input type="email" className="col-xs-6" name="email" />
			</div>
			<div className="row">
				<label className="col-xs-12">Comments</label>
				<textarea className="col-xs-12" rows="6" name="comments"></textarea>
			</div>
			<div className="row center-xs">
				<div className="col-xs-6">
					<button>Send Feedback</button>
				</div>
			</div>
		</SettingsSection>
	);
};

export default FeedbackSettings;
