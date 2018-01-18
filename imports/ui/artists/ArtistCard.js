import React, {Component} from 'react';

// import AwsImage from '../utilities/AwsImage';

export default class ArtistCard extends Component {
	render() {

		const image = this.props.artist.localImageId ? 
			<img src={`/images/${this.props.artist.localImageId}?size=283x120`} className="img-responsive center-block"/>
			: <img src={this.props.artist.imageUrl} className="img-responsive center-block" />

		return (
			<div className="artist-card col-xs-6 col-sm-4 hover" onClick={this.props.onClick}>
				{image}
				<span>{this.props.artist.name}</span>
			</div>
		);
	}
}