import React, { Component } from 'react';

class FrontNav extends Component {
	render () {
		return (
			<div id="front-nav" className="container">

				<div className="row">
					<div className="col-xs-4">
						<span>Live</span>
						<br />
						<span>Label</span>
					</div>
					<div className="col-xs-4 text-center">
						<img style={{margin: '0 auto', maxWidth: '30px'}} src="images/logo-black.png" />
					</div>
					<div className="col-xs-4 text-right">
						<span>Info</span>
						<br />
						<span>Music</span>
					</div>
				</div>

			</div>
		);
	}
}

export default FrontNav;