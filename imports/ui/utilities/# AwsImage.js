import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import Preloader from './Preloader';

// localImageId: required
// size: e.x. 300x400
// onClick: function
// className: image-class

class AwsImage extends Component {
	render () {

		if (this.props.loading) {
			return <Preloader />
		}

		const url = 'https://' + Meteor.settings.public.aws.imageBucket + '.s3-website-' + Meteor.settings.public.aws.region + '.amazonaws.com/';
		const size = this.props.size ? (this.props.size + '/') : '';
		const awsUrl = url + size + this.props.localImage.awsKey;

		// const src = this.props.awsKey ? awsUrl : '/images/default_avatar.gif';

		return (
			<img 
				src={awsUrl} 
				onClick={this.props.onClick}
				className={this.props.className}
			/>
		);
	}
}

export default createContainer((params) => {
	const handle = Meteor.subscribe('images');

	const imageId = params.localImageId;

	return {
		loading: ! handle.ready(),
		localImage: Images.findOne({_id: imageId})
	}

}, AwsImage);