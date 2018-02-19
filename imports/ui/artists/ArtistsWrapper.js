import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { browserHistory } from 'react-router';

import ArtistCard from './ArtistCard.js';
import AddArtistWrapper from './AddArtistWrapper'

class ArtistsWrapper extends Component {

	goToArtist(artist) {

		if (this.props.isAdmin) {
			browserHistory.push('/admin/artist/edit/' + artist._id);
		} else {
			browserHistory.push('/artist/' + artist._id);
		}
	}

	render() {

		const addArtistWrapper = this.props.isAdmin ? <AddArtistWrapper /> : null;

		return (
			<div className="container">
				{addArtistWrapper}
				{this.props.artists.map((artist) => {
					return <ArtistCard key={artist._id} artist={artist} onClick={() => {this.goToArtist(artist)}}/>
				})}
			</div>
		);	
	}
}

export default withTracker(() => {

	Meteor.subscribe('artists');

	return {
		artists: Artists.find().fetch()
	};
})(ArtistsWrapper);