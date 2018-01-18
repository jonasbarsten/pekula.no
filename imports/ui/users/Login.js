import React, {Component} from 'react';
import {browserHistory, Link} from 'react-router';

import Preloader from '../utilities/Preloader.js';

export default class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: false
		}
	}

	handleKeyPress (event) {
		if(event.key == 'Enter'){
			this.handleSubmit();
		}
	}

	handleSubmit () {

		this.setState({
			loading: true
		});

		const email = this.refs.emailAddress.value;
		const password = this.refs.password.value;

		// Validate
		check(email, ValidEmail);
		check(password, String);

		// Login
		Meteor.loginWithPassword(email, password, (err) => {
			if (err) {
				this.setState({
					loading: false
				});
				Bert.alert(err.reason, 'danger', 'fa-frown-o');
			} else {
				this.setState({
					loading: false
				});
				browserHistory.push('/admin');
			}
		});
	}

	render () {

		if (this.state.loading) {
			return (
				<Preloader />
			);
		}

		return (
			<div className="text-center" onKeyPress={this.handleKeyPress.bind(this)}>

				<h4>Log in</h4>

				<br />

				<div className="row">
					<div className="col-sm-8 col-sm-offset-2">
						<input 
							ref="emailAddress" 
							type="email" 
							className="form-control text-center"
							placeholder="john@beatles.com"
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
							placeholder="YokoIsGreat123"
						/>
					</div>
				</div>

				<br />

				<div className="row">
					<div className="col-sm-8 col-sm-offset-2">
						<button 
							className="btn btn-success" 
							onClick={this.handleSubmit.bind(this)}>GO!
						</button>
					</div>
				</div>
				
				<br />

				<Link to="/login/forgot"><u>Reset password</u></Link>
		
			</div>
		);
	}
}