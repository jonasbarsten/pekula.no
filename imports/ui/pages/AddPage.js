import React, {Component} from 'react';

class AddPage extends Component {

	handleKeyPress (event) {
		if(event.key == 'Enter'){
			this.handleSubmit();
		}
	}

	handleSubmit() {

		Meteor.call('page.add', this.refs.name.value, this.refs.urlFriendlyName.innerHTML, (err, res) => {
			if (err) {
				console.log(err);
			} else if (res == 'exists') {
				Bert.alert('Page URL exists', 'warning', 'growl-bottom-right', 'fa-smile-o');
			} else {
				this.refs.name.value = '';
				this.refs.urlFriendlyName.innerHTML = '';
				Bert.alert('Page added', 'success', 'growl-bottom-right', 'fa-smile-o');
			}
		});
	}

	urlFriendly() {

		var url = this.refs.name.value.replace(/[^\w\s]/gi, '');
		url = url.replace(/\s+/g, '-').toLowerCase();

		this.refs.urlFriendlyName.innerHTML = url;
	}

	render() {

		return (
			<div onKeyPress={this.handleKeyPress.bind(this)}>
				<div className="row">

					<div className="col-xs-8">
						<input 
							placeholder="Contact The Beatles"
							type="text"
							ref="name"
							className="form-control"
							onChange={this.urlFriendly.bind(this)}
						/>
					</div>

					<div className="col-xs-4 text-right">
						<button onClick={this.handleSubmit.bind(this)} className="btn btn-success"><span className="glyphicon glyphicon-plus"></span></button>
					</div>

				</div>

				<br />

				<div className="row">
					<div className="col-xs-12">
						<p>
							{Meteor.settings.public.url}/pages/
							<span ref="urlFriendlyName"></span>
						</p>
					</div>
				</div>
			</div>
		);
	}
}

export default AddPage;