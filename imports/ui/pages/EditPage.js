import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import swal from 'sweetalert2';
import { browserHistory } from 'react-router';

import BarstenEditor from '../utilities/BarstenEditorTwo';
import Preloader from '../utilities/Preloader';

class EditPage extends Component {

	saveContent(editorState) {
		Meteor.call('page.update', this.props.params.urlFriendlyName, editorState, (err, res) => {
			if (err) {
				console.log(err);
			} else {
				Bert.alert('Content saved', 'success', 'growl-bottom-right', 'fa-smile-o');
			}
		});
	}

	deletePage () {

		swal({
			title: 'Are you sure?',
			text: "You will not be able to recover this page!",
			type: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Yes, delete it!'
		}).then(() => {
			Meteor.call('page.delete', this.props.params.urlFriendlyName, (err, res) => {
				if (err) {
					console.log(err);
					swal("Failed", "The Page could not be deleted.", "warning");
				} else {
					browserHistory.goBack();
					Bert.alert('Page deleted', 'success', 'growl-bottom-right', 'fa-smile-o');
				}
			});
		}).catch(swal.noop);

	}

	render() {

		const page = this.props.page;
		const name = (page && page.name);
		const content = (page && page.content);

		if (!this.props.ready) {
			return <Preloader />;
		}

		return(
			<div className="container">
				<h4>{name}</h4>
				<BarstenEditor 
					onChange={(editorState) => {this.saveContent(editorState)}} 
					content={content}
					maxSize={'800x400'}
				/>
				<hr />
				<button className="btn btn-danger" onClick={this.deletePage.bind(this)}>Delete page</button>
			</div>
		);
	}
}

export default withTracker((params) => {
	const handle = Meteor.subscribe('pages');

	return {
		ready: handle.ready(),
		page: Pages.find({urlFriendlyName: params.routeParams.urlFriendlyName}).fetch()[0]
	};
})(EditPage);