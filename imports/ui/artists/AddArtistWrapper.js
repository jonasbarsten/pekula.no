import React, { Component } from 'react';

import AddArtistManually from './AddArtistManually';
import AddArtistFromSpotify from './AddArtistFromSpotify';

class AddArtistWrapper extends Component {
	render () {
		return (
			<div>
				<h4>Add artist</h4>
				<AddArtistManually />
				<hr />
			</div>
			
		);
	}
}

export default AddArtistWrapper;