import React, {Component} from 'react';

class LoginLayout extends Component {
	
	render() {
		return (
			<div className="container">
				<h2>Login layout</h2>
				{this.props.children}
			</div>
		);
	}
}

export default LoginLayout;