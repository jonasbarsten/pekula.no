import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import UserRow from './UserRow';

class UserList extends Component {
	render () {

		return (
			<div>
				{this.props.users.map((user) => {
					return (
						<UserRow key={user._id} user={user} />
					);
				})}
			</div>
		);
	}
}

export default createContainer(() => {

	Meteor.subscribe('allUsers');

	return {
		users: Meteor.users.find().fetch()
	};
}, UserList);