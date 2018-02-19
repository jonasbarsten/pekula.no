import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import swal from 'sweetalert2';

import AddReleasePost from './AddReleasePost';
import PostSingle from './PostSingle';

class PostsWrapper extends Component {

	constructor () {
		super ();
		this.state = {
			postType: 'release'
		}
	}

	changePostType () {
		this.setState({
			postType: this.refs.postTypeSelector.value
		});
	}

	removePost(postId) {
		swal({
			title: 'Delete this stuff?',
			text: "You won't be able to revert this!",
			type: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Yes, delete it!'
		}).then((result) => {
			if (result.value) {
				Meteor.call('post.remove', postId);
			}
		});
	}

	render () {

		let typeElement = null;

		const posts = this.props.posts.filter((post) => {
			return post.type == this.state.postType;
		});

		switch (this.state.postType) {
			case 'release':
				typeElement = <AddReleasePost />;
				break;
			default:
				typeElement = null;
		}

		return (
			<div className="container">
				<div className="row">
					<form className="col-xs-12">
						<div className="form-group">
							<label>Choose stuff type</label>
							<select ref="postTypeSelector" className="form-control" onChange={this.changePostType.bind(this)}>
									<option value="release">Release</option>
									<option value="video">Video</option>
									<option value="artist">Artist</option>
									<option value="audio">Audio</option>
							</select>
						</div>
					</form>
				</div>
				<hr />
				<div className="row">
					<div className="col-xs-12">
						{typeElement}
					</div>
				</div>
				<hr />
				<div>
					{posts.map((post) => {
						return <PostSingle post={post} key={post._id} onClick={this.removePost.bind(this, post._id)}/>
					})}
				</div>
			</div>
		);
	}
}

export default withTracker(() => {
	Meteor.subscribe('posts');

	return {
		posts: Posts.find().fetch()
	}

})(PostsWrapper);