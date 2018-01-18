import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';

export default class InviteSignUp extends Component {

	handleKeyPress (event) {
		if(event.key == 'Enter'){
			this.handleSubmit();
		}
	}

	handleSubmit () {

		// Fetch data from form
		const email = this.refs.emailAddress.value;
		const firstName = this.refs.firstName.value;
		const lastName = this.refs.lastName.value;
		const password = this.refs.password.value;
		const token = this.props.params.token;

		// Validate

		check(email, ValidEmail);
		check(firstName, String);
		check(lastName, String);
		check(password, String);
		check(token, String);

		// Make user object

		let user = {
			'email': email,
			'firstName': firstName,
			'lastName': lastName,
			'password': Accounts._hashPassword(password),
			'token': token
		}

		// Check token (creating user and giving role 'invited' in method if token matches)

		Meteor.call('createInvitedUser', user, function(error) {
			if (error) {
				alert(error.reason);
			} else {
				Meteor.loginWithPassword(user.email, password, function(error) {
					if (error) {
						alert( error.reason );
					} else {
						browserHistory.push('/admin');
					}
				});
			}
		});
	}

	render () {
		return (
			<div className="text-center" onKeyPress={this.handleKeyPress.bind(this)}>

				<h4>Sign up!</h4>

				<br />

				<div className="row">
					<div className="col-sm-8 col-sm-offset-2">
						<input 
							ref="firstName" 
							type="text" 
							className="form-control text-center"
							placeholder="first name"
						/>
					</div>
				</div>

				<br />

				<div className="row">
					<div className="col-sm-8 col-sm-offset-2">
						<input 
							ref="lastName" 
							type="text" 
							className="form-control text-center"
							placeholder="last name"
						/>
					</div>
				</div>

				<br />

				<div className="row">
					<div className="col-sm-8 col-sm-offset-2">
						<input 
							ref="emailAddress" 
							type="email" 
							className="form-control text-center"
							placeholder="email"
						/>
					</div>
				</div>

				<br />
				
				<div className="row">
					<div className="col-sm-8 col-sm-offset-2">
						<input 
							ref="password" 
							type="password" 
							className="form-control text-center"
							placeholder="password"
						/>
					</div>
				</div>

				<br />

				<div className="row">
					<div className="col-sm-8 col-sm-offset-2">
						<button className="btn btn-success" onClick={this.handleSubmit.bind(this)}>GO!</button>
					</div>
				</div>

				<br />

				<Link to="/login/forgot"><u>Reset password</u></Link>

				<br />

				<Link to="/login"><u>Log in</u></Link>
			
			</div>
		);
	}
}