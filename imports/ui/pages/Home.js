import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { browserHistory } from 'react-router';

import PostSingle from '../posts/PostSingle';

class Home extends Component {

	goToPost(post) {
		switch (post.type) {
			case 'release':
				browserHistory.push(`/release/${post.relatedId}`);
				break;
			default:
				break;
		}

	}

	render () {

		if (this.props.loading) {
			return <p>Loading ...</p>
		}

		const posts = this.props.posts;

		return (
			<div>
				<div id="home-wrapper" className="text-center container">
					{posts.map((post) => {
						return <PostSingle post={post} key={post._id} onClick={this.goToPost.bind(this, post)} />
					})}
				</div>
			</div>
		);
	}
}

export default withTracker(() => {

	const handle = Meteor.subscribe('posts');

	return {
		loading: !handle.ready(),
		posts: Posts.find().fetch()
	};

})(Home);