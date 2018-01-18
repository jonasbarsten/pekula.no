import React, { Component } from 'react';

class Home extends Component {

	render () {

		return (
			<div>
				<div id="home-wrapper" className="text-center container">
					<div className="row">
						<img src="images/logo.png" />
						<div className="spacer-50"></div>
						<h3>Coming Soon!</h3>
						<a className="hover" href="mailto:contact@pekula.no"><p>contact@pekula.no</p></a>
					</div>
				</div>
			</div>
		);
	}
}

export default Home;