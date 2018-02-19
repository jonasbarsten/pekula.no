import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';

import Preloader from '../utilities/Preloader.js';
import BarstenViewer from '../utilities/BarstenViewer.js';

class PageSingle extends Component {

	componentDidMount() {

		if (navigator.userAgent.match(/(iPod|iPhone|iPad|Android)/)) {           
            window.scrollTo(0,0);
        } else {
        	$(window).scrollTop();
        }

		Meteor.call('page.view', this.props.params.urlFriendlyName);
	}

	render() {

		const page = this.props.page;

		if (!page) {
			return <Preloader />
		}

		return (
			<div className="container-fluid no-side-padding">
				<div className="container no-side-padding">
					<div className="page-single-content">
						<BarstenViewer key={page._id} content={page.content} placeholder='No content yet ...' />
					</div>
				</div>
			</div>
		);
	}
}

export default withTracker((params) => {
	Meteor.subscribe('pages');

	return {
		page: Pages.find({urlFriendlyName: params.routeParams.urlFriendlyName}).fetch()[0],
	};
})(PageSingle);