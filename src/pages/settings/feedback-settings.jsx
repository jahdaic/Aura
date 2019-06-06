import React, { Component } from 'react';
import SettingsSection from '../../components/settings-section';
import * as appActions from '../../actions/app-actions';

class FeedbackSettings extends Component {
	constructor(props) {
		super(props);

		this.updateForm = this.updateForm.bind(this);
		this.submitFeedback = this.submitFeedback.bind(this);

		this.state = {
			subject: '',
			name: '',
			email: '',
			body: '',
			sent: false,
		};
	}

	updateForm(ev) {
		this.setState({
			[ev.target.name]: ev.target.value,
		});
	}

	submitFeedback() {
		const { subject, name, email, body } = this.state;

		appActions.sendFeedback(`${name} <${email}>`, subject, body);

		this.setState({
			subject: '',
			name: '',
			email: '',
			body: '',
			sent: true,
		});
	}

	render() {
		const { subject, name, email, body, sent } = this.state;

		return (
			<SettingsSection title="Feedback">
				<div className="row">
					<div className="col-xs-12">
						{sent ? (
							<p className="blue text-center bold">Thank you for the feedback! ❤</p>
						) : (
							<p>This app is still in development, but I'd love to hear from you.</p>
						)}
					</div>
				</div>
				<div className="row">
					<label className="col-xs-6">Subject</label>
					<div className="col-xs-6">
						<input type="text" name="subject" value={subject} onChange={this.updateForm} />
					</div>
				</div>
				<div className="row">
					<label className="col-xs-6">Name</label>
					<div className="col-xs-6">
						<input type="text" name="name" value={name} onChange={this.updateForm} />
					</div>
				</div>
				<div className="row">
					<label className="col-xs-6">Email</label>
					<div className="col-xs-6">
						<input type="email" name="email" value={email} onChange={this.updateForm} />
					</div>
				</div>
				<div className="row">
					<label className="col-xs-12">Comments</label>
					<div className="col-xs-12">
						<textarea rows="6" name="body" value={body} onChange={this.updateForm} />
					</div>
				</div>
				<div className="row center-xs">
					<div className="col-xs-6">
						<button type="button" onClick={this.submitFeedback}>
							Send Feedback
						</button>
					</div>
				</div>
			</SettingsSection>
		);
	}
}

export default FeedbackSettings;
