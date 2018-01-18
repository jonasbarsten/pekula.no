import React, { Component } from 'react';

import Preloader from '../utilities/Preloader';

class Invite extends Component {

	handleKeyPress (event) {
		if(event.key == 'Enter'){
			this.handleSubmit();
		}
	}

	constructor () {
		super();
		this.state = {
			isLoading: false
		};
	}

	handleSubmit () {
		this.setState({isLoading: true});

		var email = this.refs.email.value.trim();

		if (email) {

			Meteor.call('inviteUser', email, (error, data) => {

				if(error) {
					Bert.alert('Could not invite user, check your internet connection', 'danger', 'fa-frown-o');
					
					this.setState({isLoading: false});
					this.refs.email.value = "";

					Meteor.call('deleteInvite', email);

				} else {
					Bert.alert('User invited', 'success', 'fa-smile-o');
		
					this.setState({isLoading: false});
					this.refs.email.value = "";
				}
			});
		}
	}

	render () {

		if (this.state.isLoading) {
			return <Preloader />
		}

		return (
			<div onKeyPress={this.handleKeyPress.bind(this)}>
				<div className="row">

					<div className="col-xs-8">
						<input 
							type="email" 
							ref="email" 
							placeholder="ringo@beatles.com"
							className="form-control"
						/>
					</div>

					<div className="col-xs-4 text-right">
						<button onClick={this.handleSubmit.bind(this)} className="btn btn-success">Send</button>
					</div>

				</div>
			</div>
		);
	}
};

export default Invite;