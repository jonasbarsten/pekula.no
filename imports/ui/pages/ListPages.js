import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Link } from 'react-router';

class ListPages extends Component {

	render() {
		return (
			<div>
		
				<div className="row">
					
					<div className="col-xs-2">
						<h4>VIEWS</h4>
					</div>
					
					<div className="col-xs-5">
						<h4>EDIT</h4>
					</div>
					<div className="col-xs-5">
						<h4>PUBLIC URL</h4>
					</div>
					
				</div>



				{ this.props.pages.map((page) => {

					const editUrl = '/admin/pages/edit/' + page.urlFriendlyName;
					const visitUrl = Meteor.settings.public.url + '/pages/' + page.urlFriendlyName;

					return (

						<div key={page._id} className="row">
							
							<div className="col-xs-2">
								<span className="label label-primary">{page.views} views</span>
							</div>
							
							<div className="col-xs-5">
								<Link to={editUrl}>
									{page.name}
								</Link>
							</div>
							<div className="col-xs-5">
								<Link to={visitUrl}>{visitUrl}</Link>
							</div>
							
						</div>

					);
				})}
	
			</div>
		);
	}
}

export default withTracker(() => {
	Meteor.subscribe('pages');

	return {
		pages: Pages.find().fetch()
	};
})(ListPages);