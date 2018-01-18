import React, {Component} from 'react';

export default class AddLink extends Component {

	handleSubmit() {

		this.props.onSubmit({
			name: this.refs.name.value,
			url: this.refs.url.value,
			id: Random.hexString( 15 )
		});

		this.refs.name.value = '';
		this.refs.url.value = '';
	}

	render() {
		return (
			<div>
				<div className="row add-link-form">
					<div className="col-xs-5">
						<input
							type="text"
							ref="name"
							placeholder="Homepage / Spotify"
							className="form-control"
						/>
					</div>
					<div className="col-xs-5">
						<input
							type="text"
							ref="url"
							placeholder="http://thebeatles.com"
							className="form-control"
						/>
					</div>
					<div className="col-xs-2 text-right">
						<button onClick={this.handleSubmit.bind(this)}className="btn btn-success">Add</button>
					</div>
				</div>
			</div>
		);
	}
}