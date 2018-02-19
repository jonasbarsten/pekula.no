import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';

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

export default withTracker(() => {

	Meteor.subscribe('allUsers');

	return {
		users: Meteor.users.find().fetch()
	};
})(UserList);