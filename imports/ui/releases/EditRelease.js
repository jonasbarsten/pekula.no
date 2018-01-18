import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import swal from 'sweetalert2';
import { browserHistory } from 'react-router';
import DatePicker from 'react-datepicker';
import moment from 'moment';
// import Reorder from 'react-reorder';
// import _ from 'lodash';

import BarstenEditor from '../utilities/BarstenEditorTwo';
import AddLink from '../utilities/AddLink';
import Preloader from '../utilities/Preloader';
import LinkSort from '../utilities/LinkSort';
import AwsUpload from '../utilities/AwsUpload';
// import AwsImage from '../utilities/AwsImage';

import ArtistCard from '../artists/ArtistCard.js'

class EditRelease extends Component {

	deleteRelease () {

		swal({
			title: 'Are you sure?',
			text: "You will not be able to recover this release!",
			type: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Yes, delete it!'
		}).then(() => {
			Meteor.call('release.delete', this.props.release._id, function(err, data) {
				if (err) {
					swal("The release cound not be deleted.", "warning");
				} else {
					browserHistory.goBack();
					Bert.alert('Release deleted', 'success', 'growl-bottom-right', 'fa-smile-o');
				}
			});
		// Since this is a promise, we have to catch "cancel" and say it is ok
		}).catch(swal.noop);
	}

	openEditImage () {
		
		$('#newReleaseImage').trigger('click');
	}

	editName () {

		swal({
			title: "Change release name",
			text: "Well well well, go ahead!",
			input: "text",
			showCancelButton: true,
			animation: "slide-from-top",
			inputPlaceholder: "New release name",
			inputValidator: function (value) {
				return new Promise(function (resolve, reject) {
					if (value) {
						resolve()
					} else {
						reject('You need to write something!')
					}
				})
			}
		}).then((result) => {

			Meteor.call('release.changeName', this.props.release._id, result, function (err, data) {
				if (err) {
					console.log(err);
				} else {
					Bert.alert('Name changed', 'success', 'growl-bottom-right', 'fa-smile-o');
				}
			})
		}).catch(swal.noop);
	}

	addLink(link) {

		const linkUrl = link.url;
		const url = new URL(linkUrl);

		const host = url.origin;
		const path = url.pathname;

		// Store only path if link is local
		if (host == Meteor.settings.public.url) {
			link.url = path;
			link.isLocal = true;
		}

		Meteor.call('release.addLink', this.props.release._id, link, function (err, res) {
			if (err) {
				console.log(err);
			} else {
				Bert.alert('Link added', 'success', 'growl-bottom-right', 'fa-smile-o');
			}
		});
	}

	deleteLink(event, link) {

		swal({
			title: "Are you sure?",
			text: "You will not be able to recover this link!",
			type: "warning",
			showCancelButton: true,
			confirmButtonColor: "#DD6B55",
			confirmButtonText: "Yes, delete it!",
			closeOnConfirm: true
		},
		() => {
			Meteor.call('removeLinkFromRelease', link, this.props.params.releaseId, function(err, res) {
				if (err) {
					console.log(err);
				} else {
					Bert.alert('Link removed', 'success', 'growl-bottom-right', 'fa-smile-o');
				}
			});
		});

	}

	onAboutChange(editorState) {

		Meteor.call('updateReleaseAbout', this.props.params.releaseId, editorState, function (err, res) {
			if (err) {
				console.log(err)
			} else {
				Bert.alert('About saved', 'success', 'growl-bottom-right', 'fa-smile-o');
			}
		});

	}

	changeReleaseDate(date) {

		Meteor.call('changeReleaseDate', this.props.params.releaseId, date.toDate(), function (err, res) {
			if (err) {
				console.log(err);
			} else {
				Bert.alert('Release date changed', 'success', 'growl-bottom-right', 'fa-smile-o');
			}
		});
	}

	changeReleaseType () {

		swal({
			title: "Change release type",
			text: "Album / EP / Single / etc ...",
			input: "text",
			showCancelButton: true,
			animation: "slide-from-top",
			inputPlaceholder: "New release type",
			inputValidator: function (value) {
				return new Promise(function (resolve, reject) {
					if (value) {
						resolve()
					} else {
						reject('You need to write something!')
					}
				})
			}
		}).then((result) => {

			Meteor.call('release.changeType', this.props.release._id, result, function (err, data) {
				if (err) {
					console.log(err);
				} else {
					Bert.alert('Type changed', 'success', 'growl-bottom-right', 'fa-smile-o');
				}
			})
		}).catch(swal.noop);
	}

	detachArtist(artistId) {

		swal({
			title: "Are you sure?",
			text: "You may re-attach this artist later and the artist will not be deleted",
			type: "warning",
			showCancelButton: true,
			confirmButtonColor: "#DD6B55",
			confirmButtonText: "Yes, detach it!",
			closeOnConfirm: true
		},
		() => {
			Meteor.call('detachArtistFromRelease', artistId, this.props.params.releaseId, function (err, res) {
				if (err) {
					console.log(err);
				} else {
					Bert.alert('Artist detached', 'success', 'growl-bottom-right', 'fa-smile-o');
				}
			});
		});
	}

	reorderLinks(links) {
		Meteor.call('release.reorderLinks', this.props.release._id, links);
	}

	imageChanged() {
		Bert.alert('Image changed', 'success', 'growl-bottom-right', 'fa-smile-o');
	}

	addTrackLink(track) {

		swal({
			title: "Add track lyrics",
			text: "https:// ...",
			type: "input",
			showCancelButton: true,
			animation: "slide-from-top",
			inputPlaceholder: "Lyrics page",
			closeOnConfirm: true
		},
		(inputValue) => {

			if (inputValue === false) return false;

			// Default link, if external
			var link = {
				isLocal: false,
				url: inputValue
			};

			const url = new URL(inputValue);

			const host = url.origin;
			const path = url.pathname;

			// Store only path if link is local
			if (host == Meteor.settings.public.url) {
				link.url = path;
				link.isLocal = true;
			}

			Meteor.call('addTrackLink', track._id, link, function (err, data) {
				if (err) {
					swal.showInputError("Whoops, try again!");
				} else {
					Bert.alert('Link added', 'success', 'growl-bottom-right', 'fa-smile-o');
				}
			})
			
		});


	}

	render () {

		const release = this.props.release;

		if (!release) {
			return <Preloader />
		}

		const image = release.localImageId ?
			<img src={`/images/${release.localImageId}?size=500x500`} className="img-responsive" />
			: <img src={release.imageUrl} className="img-responsive" />;


		const releaseType = release.albumType ? release.albumType : 'no album type ...';

		const links = (release.links && release.links[0]) ? 
			<LinkSort 
				items={release.links} 
				itemClass="col-xs-3 edit-links hover"
				reorder={this.reorderLinks.bind(this)}
				onClick={this.deleteLink.bind(this)}
			/> 
			: null;

		return (
			<div>

				<AwsUpload 
					elementId='newReleaseImage'
					postUploadMethod='release.changeImage'
					documentId={release._id}
					done={this.imageChanged.bind(this)}
					image 
				/>

				<div className="container-fluid">

					<div className="release-banner" onClick={this.openEditImage.bind(this)}>
						{image}
					</div>
					
					<div className="container">

						<div className="release-single-content">

							<div className="text-center">
								<h2 onClick={this.editName.bind(this)}>{release.name}</h2>
							</div>

							<div className="row">
								<div className="col-xs-6">
									<p onClick={this.changeReleaseType.bind(this)}>{releaseType}</p>
								</div>
								<div className="col-xs-6 text-right">

									<DatePicker 
										withPortal
										showMonthDropdown 
										showYearDropdown 
										dropdownMode="select"
										dateFormat="YYYY-MM-DD"
										selected={moment(release.releaseDate)}
										onChange={this.changeReleaseDate.bind(this)}
									/>

								</div>
							</div>

							<hr />

							<AddLink onSubmit={(link) => {this.addLink(link)}} />

							<br />

							<p>Click link to delete ... </p>

							{links}

							<hr />

							<h4>About</h4>

							<BarstenEditor 
								onChange={(editorState) => {this.onAboutChange(editorState)}} 
								content={release.about}
							/>

							<hr />

							<h4>Tracks</h4>

							<ul>

							<p>Click track to add/edit lyrics link ... </p>

							{this.props.tracks.map((track) => {

								var x = track.duration / 1000;
								const seconds = Math.round(x % 60);
								x = x / 60;
								const minutes = Math.round(x % 60);

								const link = (track.link && track.link.url) ? <span className="track-has-lyrics"><span>LYRICS</span></span> : '';

								return <li key={track._id} onClick={() => {this.addTrackLink(track)}}>{track.trackNumber} - {track.name} {link}</li>
							})}

							</ul>
							<hr />

							<button 
								className="btn btn-danger"
								onClick={this.deleteRelease.bind(this)}
							>Delete release</button>

						</div>
						
					</div>

				</div>

						

			
			</div>
		);
	}
}

export default createContainer((params) => {
	Meteor.subscribe('releases');
	Meteor.subscribe('artists');
	Meteor.subscribe('tracks');

	const releaseId = params.routeParams.releaseId;
	const release = Releases.find({_id: releaseId}).fetch()[0];
	var artists = [];
	var tracks = [];

	if (release) {
		artists = Artists.find({_id: {$in: release.artists}}).fetch();
		tracks = Tracks.find({release: release._id}).fetch();
	};
	
	return {
		release: release,
		artists: artists,
		tracks: tracks
	};
}, EditRelease)