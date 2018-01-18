import React, { Component } from 'react';

class AddArtistManually extends Component {

	handleKeyPress (event) {
		if(event.key == 'Enter'){
			this.handleSubmit();
		}
	}

	handleSubmit () {
		check(this.refs.name.value, String);

		var artist = {
			name: this.refs.name.value,
			nameLower: this.refs.name.value.toLowerCase(),
			imageUrl: 'http://placehold.it/640x640?text=No+Image',
			lastChanged: new Date(),
			bannerType: 'picture'
		}

		Meteor.call('artist.add', artist, (err, res) => {
			if (err) {
				console.log(err);
				this.refs.name.value = "";
			} else if (res == 'exists'){
				this.refs.name.value = "";
				Bert.alert('Artist exists', 'warning', 'growl-bottom-right', 'fa-info');
			} else {
				this.refs.name.value = "";
				Bert.alert('Artist added', 'success', 'growl-bottom-right', 'fa-smile-o');
			}
		});
	}

	render () {

		return (
			<div onKeyPress={this.handleKeyPress.bind(this)}>
				<div className="row">

					<div className="col-xs-8">
						<input 
							type="text"
							ref="name"
							placeholder="The Beatles"
							className="form-control"
						/>
					</div>

					<div className="col-xs-4 text-right">
						<button onClick={this.handleSubmit.bind(this)} className="btn btn-success">Add</button>
					</div>

				</div>
			</div>
		);

		// return (
		// 	<div className="row add-artist-form">

		// 		<div className="col-xs-8">
		// 			<input
		// 				type="text"
		// 				ref="name"
		// 				placeholder="name"
		// 			/>
		// 		</div>
		// 		<div className="col-xs-4 text-right">
		// 			<button onClick={this.handleSubmit.bind(this)} className="btn btn-success">Add</button>
		// 		</div>

		// 	</div>
		// );
	}
}

export default AddArtistManually;