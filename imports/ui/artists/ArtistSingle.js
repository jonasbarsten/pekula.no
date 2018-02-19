import React, {Component} from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { browserHistory, Link } from 'react-router';
import Masonry from 'react-masonry-component';
import swal from 'sweetalert2';
// import _ from 'lodash';

// import ReleaseCard from '../../../shared/components/releases/ReleaseCard.js';
import ReleaseCard from '../releases/ReleaseCard';
import BarstenViewer from '../utilities/BarstenViewer';
import Preloader from '../utilities/Preloader';

import ArtistEvents from './ArtistEvents.js';


class ArtistSingle extends Component {

	goToRelease(release) {
		browserHistory.push('/release/' + release._id);
	}

	goToLink(link) {
		browserHistory.push(link.url);
	}

	render () {

		const artist = this.props.artist;

		if (!artist) {
			return <Preloader />
		}

		const bio = artist.bio ? <div><hr /><div className="container"><BarstenViewer content={artist.bio} placeholder='No bio yet ...'/></div></div> : null;

		const songkickUpcoming = (artist && artist.songkickId) ? <div><hr /><ArtistEvents songkickId={artist.songkickId} /><hr /></div> : '';
		// const songkickPast = (artist && artist.songkickId) ? <div><ArtistEvents songkickId={artist.songkickId} scope="past" /><hr /></div> : '';
		var links = (artist && artist.links) ? artist.links : [];

		// Sort links
		links = _.sortBy(links, 'sortIndex');

		const linksHr = links.length != 0 ? <hr /> : '';

		var banner = '';

		if (artist) {
			if (artist.bannerType == 'picture') {

				if (artist.localImageId) {
					banner = <img src={`/images/${artist.localImageId}`} className="img-responsive" />;
				} else {
					banner = <img src={artist.imageUrl} className="img-responsive" />;
				}
			}

			if (artist.bannerType == 'text') {
				banner = 
					<div className="text-banner">
						<div className="v-align">
							<h1>{artist.bannerText}</h1>
						</div>
					</div>
					
			}

			if (artist.bannerType == 'youtube') {

				const src = '//www.youtube.com/embed/' + artist.bannerYouTube + '?controls=0&modestbranding="1"&showinfo=0';

				banner = 
					<div>
						<div className="embed-responsive embed-responsive-16by9">
							<iframe className="embed-responsive-item" src={src}></iframe>
						</div>
						<div className="video-banner-bottom"></div>
					</div>
			}		
		}

		const masonryOptions = {
				transitionDuration: 0
		};

		// Show loading while waiting for subscriptions
		// if (!this.props.artist || !this.props.artist) {
		// 	return <Preloader />
		// }

		return (
			<div>
				
				<div className="artist-banner">
					{banner}
				</div>	

				<div className="artist-single-content">

					<div className="text-center text-uppercase">
						<h2>{artist.name}</h2>
					</div>

					{linksHr}

					<div className="row link-list">
						{links.map((link) => {

							var target = "_blank";

							// Behavior if link is on same host
							if (link.isLocal) {
								target = '';
							}

							return (
								<div key={link.id} className="col-sm-4 col-xs-6 text-center">
									<Link style={{textTranform: "uppercase"}} target={target} to={link.url}>{link.name}</Link>
								</div>
							);
						})}
					</div>

					{bio}

					{songkickUpcoming}

					<Masonry
						className={'artist-single-releases'} // default '' 
						elementType={'div'} // default 'div'
						options={masonryOptions}
						disableImagesLoaded={false} // default false 
						updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false 
					>
						{this.props.releases.map((release) => {
							return <ReleaseCard key={release._id} release={release} onClick={() => {this.goToRelease(release)}}/>
						})}
					</Masonry>

				</div>
							
			</div>
		);
	}
}

export default withTracker((params) => {
	Meteor.subscribe('artists');
	Meteor.subscribe('releases');

	const artistId = params.routeParams.artistId;

	return {
		artist: Artists.find({_id: artistId}).fetch()[0],
		releases: Releases.find({artists: {$in: [artistId]}}, {sort: {releaseDate: -1}}).fetch(),
	};
})(ArtistSingle);