import React, { Component } from 'react';

import UserList from './UserList';
import Invite from './Invite';

class UserWrapper extends Component {
	render () {
		return (
			<div className="container">
				<h4>Invite admin</h4>
				<Invite />
				<hr />
				<h4>Admins</h4>
				<UserList />
				<hr />
			</div>
		);
	}
}

export default UserWrapper;