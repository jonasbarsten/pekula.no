import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import AddReleasePost from './AddReleasePost';

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
							<label>Choose post type</label>
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

						return (
							<div key={post._id} className="row">
								<div
									className="col-xs-12"
									style={{
										backgroundImage: `url(/images/${post.localImageId}?size=800x300)`,
										backgroundSize: 'cover',
										height: '300px',
										textAlign: 'center',
										paddingTop: '100px',
										color: 'white',
										marginBottom: '20px',
										backgroundRepeat: 'no-repeat',
										backgroundPosition: 'center'
									}}
								>
									<h3>{post.heading}</h3>
									<p>{post.text}</p>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		);
	}
}

export default createContainer(() => {
	Meteor.subscribe('posts');

	return {
		posts: Posts.find().fetch()
	}

}, PostsWrapper);