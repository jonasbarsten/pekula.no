import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';

import AwsUpload from '../utilities/AwsUpload';

class AddReleasePost extends Component {

	constructor () {
		super();
		this.state = {
			uploading: false,
			file: {}
		}
	}

	handleSubmit (e) {
		e.preventDefault();

		const post = {
			type: 'release',
			heading: this.refs.heading.value,
			text: this.refs.text.value,
			relatedId: this.refs.release.value,
			image: this.state.file.localId
		};

		Meteor.call('post.add', post, (err, res) => {
			if (err) {
				console.log(err);
			} else {
				console.log(res);
			}
		});
	}

	imageUploaded (file) {
		this.setState({
			file: file,
			uploading: false
		});
	}

	uploadImage(e) {
		e.preventDefault(); 
		this.setState({uploading: true});
		$('#newPostImage').trigger('click');
	}

	render () {

		const releases = '';
		const disabled = (this.state.uploading) ? true : false;
		const imageLabel = (this.state.file.name) ? this.state.file.name : 'Upload image';
		const imageButton = (this.state.file.localId) ? 
			<img  className="text-right" src={`/images/${this.state.file.localId}?size=100x100`}/> :
			<button className="btn btn-default" onClick={this.uploadImage.bind(this)}>Choose</button>


		return (
			<div className="row">
				<AwsUpload 
					elementId='newPostImage'
					done={this.imageUploaded.bind(this)}
					image 
				/>
				<form onSubmit={this.handleSubmit.bind(this)}>
					<div className="form-group col-xs-6">
						<label>Enter heading</label>
						<input
							className="form-control"
							type="text"
							ref="heading"
							placeholder="heading"
						/>
					</div>
					<div className="form-group col-xs-6">
						<label>Enter text</label>
						<input
							className="form-control"
							type="text"
							ref="text"
							placeholder="text"
						/>
					</div>
					<div className="form-group col-xs-6">
						<label>Choose release</label>
						<select ref="release" className="form-control">
							{this.props.releases.map((release) => {
								return (
									<option key={release._id} value={release._id}>{release.name}</option>
								);
							})}
						</select>
					</div>
					<div className="form-group col-xs-6">
						<label>{imageLabel}</label>
						<div>
							{imageButton}
						</div>
					</div>
					<div className="row">
						<div className="form-group col-xs-12">
							<button disabled={disabled} type="submit" className="btn btn-success form-control">Add</button>
						</div>
					</div>
				</form>
			</div>
		);
	}
}

export default withTracker(() => {
	Meteor.subscribe('releases');

	return {
		releases: Releases.find().fetch()
	}

})(AddReleasePost);