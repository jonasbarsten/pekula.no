import React, {Component} from 'react';
import { Helmet } from 'react-helmet';

import FrontNav from './navigation/FrontNav';

class FrontLayout extends Component {
	
	render() {

		const routeName = Meteor.settings.public.siteTitle + ' || ' + this.props.routes[this.props.routes.length - 1].name;

		return (
			<div>
				<Helmet>
					<title>{routeName}</title>
				</Helmet>
				<FrontNav />
				{this.props.children}
			</div>
		);
	}
}

export default FrontLayout;