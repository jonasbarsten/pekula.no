import React, { Component } from 'react';
import { Link } from 'react-router'

class FrontNav extends Component {
	render () {
		return (
			<div id="front-nav" className="container">

				<div className="row">
					<div className="col-xs-4">
						<Link to="/">
							<span style={{color: "black"}}>Stuff</span>
						</Link>
						<br />
						<Link to="/artists">
							<span style={{color: "black"}}>Bands</span>
						</Link>
					</div>
					<div className="col-xs-4 text-center">
						<Link to="/">
							<img style={{margin: '0 auto', maxWidth: '30px'}} src="/images/logo-black.png" />
						</Link>
					</div>
					<div className="col-xs-4 text-right">
						<Link to="/pages/info">
							<span style={{color: "black"}}>Info</span>
						</Link>
						<br />
						<Link to="/releases">
							<span style={{color: "black"}}>Music</span>
						</Link>
					</div>
				</div>

			</div>
		);
	}
}

export default FrontNav;