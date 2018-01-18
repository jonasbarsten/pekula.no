import React, {Component} from 'react';
import { Helmet } from 'react-helmet';

import AdminNav from './navigation/AdminNav';

class AdminLayout extends Component {
	
	render() {

		const routeName = Meteor.settings.public.siteTitle + ' || ' + this.props.routes[this.props.routes.length - 1].name;
		const pathName = this.props.location.pathname;

		const childrenWithProps = React.Children.map(this.props.children,
			(child) => React.cloneElement(child, {
				isAdmin: true
			})
		);

		return (
			<div>
				<Helmet>
					<title>{routeName}</title>
				</Helmet>
				<AdminNav pathName={pathName}/>

				{childrenWithProps}

			</div>
		);
	}
}

export default AdminLayout;