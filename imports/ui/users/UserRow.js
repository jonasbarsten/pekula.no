import React, { Component } from 'react';

class UserRow extends Component {
	render () {

		const user = this.props.user;

		return (
			<div className="row">
				<p className="col-xs-12">{user.emails[0].address}</p>
			</div>
		);
	}
}

export default UserRow;