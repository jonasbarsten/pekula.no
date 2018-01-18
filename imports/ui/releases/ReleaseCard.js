import React, { Component } from 'react';

// import AwsImage from '../utilities/AwsImage';

export default class ReleaseCard extends Component {

	render() {

		const image = this.props.release.localImageId ? 

			<img src={`/images/${this.props.release.localImageId}?size=250x250`} className="img-responsive center-block"/>
			: <img src={this.props.release.imageUrl} className="img-responsive center-block" />

		return (
			<div className='release-card col-xs-6 col-sm-4 hover' onClick={this.props.onClick}>
				{image}
				<span>{this.props.release.name}</span>
			</div>
		);
	}
}