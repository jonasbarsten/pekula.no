import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { browserHistory } from 'react-router';
import Masonry from 'react-masonry-component';

import ReleaseCard from './ReleaseCard';
import Preloader from '../utilities/Preloader';

class AllReleases extends Component {

	goToRelease(release) {
		browserHistory.push('/release/' + release._id);
	}

	render() {
		const masonryOptions = {
    		transitionDuration: 0
		};

		const releases = this.props.releases;

		if (!releases) {
			return <Preloader />
		}

		return (
			<div className="container">
				<div className="row">
		            <Masonry
		            	className={''} // default '' 
		            	elementType={'div'} // default 'div'
		            	options={masonryOptions}
		            	disableImagesLoaded={false} // default false 
		            	updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false 
		            >
						{releases.map((release) => {
							return <ReleaseCard key={release._id} release={release} onClick={() => {this.goToRelease(release)}}/>
						})}
		            </Masonry>

				</div>
			</div>
		);
	}
}

export default withTracker(() => {

	const handle = Meteor.subscribe('releases');

	return {
		loading: !handle.ready(),
		releases: Releases.find().fetch()
	}

})(AllReleases);