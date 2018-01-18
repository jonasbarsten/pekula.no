import React, {Component} from 'react';
import { browserHistory, Link } from 'react-router';

export default class Forgot extends Component {

	handleKeyPress (event) {
		if(event.key == 'Enter'){
			this.handleSubmit();
		}
	}

	handleSubmit () {

		const email = this.refs.emailAddress.value;

		check(email, ValidEmail);

		var options = {
			'email': email
		};

		// Send reset mail
		Accounts.forgotPassword(options, function(err) {
			if (err) {
				Bert.alert(err.reason, 'danger', 'fa-frown-o');
			} else {
				Bert.alert('Reset email sendt', 'success', 'fa-smile-o');
				browserHistory.push('/login');
			}
		})
	}

	render () {
		return (
			<div className="text-center" onKeyPress={this.handleKeyPress.bind(this)}>

				<div className="row">

					<h4>Forgot password</h4>

				</div>

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
						<button 
							onClick={this.handleSubmit.bind(this)}
							className="btn btn-success"
						>Send reset email</button>
					</div>
				</div>

				<br />

				<Link to="/login"><u>Log in</u></Link>
		
			</div>
		);
	}
}