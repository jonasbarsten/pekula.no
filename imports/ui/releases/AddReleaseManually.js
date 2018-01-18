import React, {Component} from 'react';

export default class AddReleaseManually extends Component {

	handleKeyPress (event) {
		if(event.key == 'Enter'){
			this.handleSubmit();
		}
	}

	handleSubmit () {

		check(this.refs.name.value, String);

		var release = {
			name: this.refs.name.value,
			imageUrl: 'http://placehold.it/640x640?text=No+Image',
			lastChanged: new Date()
		}

		if (this.props.artistId) {
			release.artists = [this.props.artistId];
		}

		Meteor.call('addRelease', release, (err, data) => {
			if (err) {
				console.log(err);
				this.refs.name.value = "";
			} else {
				this.refs.name.value = "";
				Bert.alert('Release added', 'success', 'growl-bottom-right', 'fa-smile-o');
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
							placeholder="Kind of Blue"
							className="form-control"
						/>
					</div>

					<div className="col-xs-4 text-right">
						<button onClick={this.handleSubmit.bind(this)} className="btn btn-success">Add</button>
					</div>

				</div>
			</div>
		);
	}
}