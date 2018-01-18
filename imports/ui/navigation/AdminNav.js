import React, { Component } from 'react';
import { Link } from 'react-router';

class AdminNav extends Component {

	render () {

		const pathName = this.props.pathName;

		const usersActiveClass = (pathName == '/admin/users') ? 'active' : '';
		const pagesActiveClass = (pathName == '/admin/pages') ? 'active' : '';
		const artistsActiveClass = (pathName == '/admin/artists') ? 'active' : '';
		const postsActiveClass = (pathName == '/admin/posts') ? 'active' : '';

		return (
			<nav className="navbar navbar-default">
				<div className="container-fluid">
					<div className="navbar-header">
						<button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
							<span className="sr-only">Toggle navigation</span>
							<span className="icon-bar"></span>
							<span className="icon-bar"></span>
							<span className="icon-bar"></span>
						</button>
						<Link className="navbar-brand" to="/admin">{Meteor.settings.public.siteTitle} ADMIN</Link>
					</div>

					<div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
						<ul className="nav navbar-nav">
							<li className={usersActiveClass}><Link to="/admin/users">Users</Link></li>
							<li className={pagesActiveClass}><Link to="/admin/pages">Pages</Link></li>
							<li className={artistsActiveClass}><Link to="/admin/artists">Artists</Link></li>
							<li className={postsActiveClass}><Link to="/admin/posts">Posts</Link></li>
						</ul>

						<ul className="nav navbar-nav navbar-right">
							<li onClick={() => Meteor.logout()}><a className="hover">Sign out</a></li>
						</ul>
					</div>
				</div>
			</nav>
		);
	}
}

export default AdminNav;