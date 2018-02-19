import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import swal from 'sweetalert2';
import { browserHistory } from 'react-router';
import Masonry from 'react-masonry-component';
// import _ from 'lodash';

// import UploadSingleFile from '../../../shared/components/files/UploadSingleFile.js';
import BarstenEditor from '../utilities/BarstenEditorTwo';
import AddLink from '../utilities/AddLink';
import Preloader from '../utilities/Preloader';
import LinkSort from '../utilities/LinkSort';
import AwsUpload from '../utilities/AwsUpload';
// import AwsImage from '../utilities/AwsImage';

import AddRelease from '../releases/AddRelease';
import ReleaseCard from '../releases/ReleaseCard';

class EditArtist extends Component {

	deleteArtist () {

		swal({
			title: 'Are you sure?',
			text: "You will not be able to recover this artist!",
			type: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Yes, delete it!'
		}).then((result) => {
			if (result.value) {
				Meteor.call('artist.delete', this.props.artist._id, function(err, data) {
					if (err) {
						swal("The artist cound not be deleted.", "warning");
					} else {
						browserHistory.push('/admin/artists');
						Bert.alert('Artist deleted', 'success', 'growl-bottom-right', 'fa-smile-o');
					}
				});
			}
		});
	}

	changeBannerType(type) {

		const artist = this.props.artist;

		if (artist.bannerType == type) {
			Bert.alert('Banner type stays the same', 'success', 'growl-bottom-right', 'fa-smile-o');
			
		} else {
			Meteor.call('changeArtistBannerType', this.props.artist._id, type, function (err, data) {
				if (err) {
					console.log(err);
				} else {
					Bert.alert('Banner type changed', 'success', 'growl-bottom-right', 'fa-smile-o');
				}
			});
		}

	}

	changeBannerText(text) {
		Meteor.call('artist.changeBannerText', this.props.artist._id, text, function (err, data) {
			if (err) {
				console.log(err);
			} else {
				Bert.alert('Banner text changed', 'success', 'growl-bottom-right', 'fa-smile-o');
			}
		});
	}

	changeBannerYouTube(url) {
		Meteor.call('changeArtistBannerYouTube', this.props.artist._id, url, function (err, data) {
			if (err) {
				console.log(err);
			} else {
				Bert.alert('Banner YouTube URL changed', 'success', 'growl-bottom-right', 'fa-smile-o');
			}
		});
	}

	openEditBanner () {

		const artist = this.props.artist;

		swal({
			title: 'Select banner type',
			input: 'select',
			inputOptions: {
				'picture': 'Picture',
				'text': 'Text',
				'youtube': 'YouTube'
			},
			showCancelButton: true,

		}).then((result) => {

			if (result.value == 'picture') {

				if (artist.localImageId) {
					swal({
						imageUrl: `/images/${artist.localImageId}?size=283x120`,
						showCancelButton: true,
						confirmButtonText: 'Use this',
						cancelButtonText: 'Replace'
					}).then((result) => {
						if (result.dismiss == "cancel") {
							$('#uploadArtistBanner').trigger('click');
						}
						if (result.value == true) {
							this.changeBannerType('picture');
						}
					});
				} else {
					swal({
						imageUrl: artist.imageUrl,
						showCancelButton: true,
						confirmButtonText: 'Use this',
						cancelButtonText: 'Replace'
					}).then((result) => {
						if (result.dismiss == "cancel") {
							$('#uploadArtistBanner').trigger('click');
						}
						if (result.value == true) {
							this.changeBannerType('picture');
						}
					});
				}
			}

			if (result.value == 'text') {
				swal({
					title: 'Banner text',
					text: artist.bannerText,
					input: 'text',
					showCancelButton: true
				}).then((result) => {
					this.changeBannerText(result.value);
					this.changeBannerType('text');
				});
			}

			if (result.value == 'youtube') {
				swal({
					title: 'YouTube ID',
					text: artist.bannerYouTube,
					input: 'text',
					showCancelButton: true
				}).then((result) => {
					this.changeBannerYouTube(result.value);
					this.changeBannerType('youtube');
				});
			}
		});
	}

	editName () {

		swal({
			title: "Change Artist Name",
			text: "Well well well, go ahead!",
			input: "text",
			showCancelButton: true,
			animation: "slide-from-top",
			inputPlaceholder: "New Artist name",
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

			Meteor.call('artist.changeName', this.props.params.artistId, result, function (err, data) {
				if (err) {
					console.log(err);
				} else {
					Bert.alert('Name changed', 'success', 'growl-bottom-right', 'fa-smile-o');
				}
			})
		}).catch(swal.noop);

	}

	editRelease(release) {
		browserHistory.push('/admin/release/edit/' + release._id);
	}

	onBioChange(editorState) {

		Meteor.call('updateArtist', this.props.params.artistId, 'bio', editorState, function (err, res) {
			if (err) {
				console.log(err)
			} else {
				Bert.alert('Bio saved', 'success', 'growl-bottom-right', 'fa-smile-o');
			}
		});

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

		Meteor.call('artist.addLink', this.props.artist._id, link, function (err, res) {
			if (err) {
				console.log(err);
			} else {
				Bert.alert('Link added', 'success', 'growl-bottom-right', 'fa-smile-o');
			}
		});
	}

	deleteLink(link) {

		swal({
			title: 'Are you sure?',
			text: "You will not be able to recover this link!",
			type: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Yes, delete it!'
		}).then(() => {
			Meteor.call('artist.removeLink', this.props.artist._id, link, function(err, res) {
				if (err) {
					console.log(err);
				} else {
					Bert.alert('Link removed', 'success', 'growl-bottom-right', 'fa-smile-o');
				}
			});
		}).catch(swal.noop);

	}

	reorderLinks(links) {
		Meteor.call('artist.reorderLinks', this.props.artist._id, links);
	}

	updateSongkickId(e) {
		e.preventDefault();

		Meteor.call('updateSongkickId', this.props.params.artistId, this.refs.songkickId.value, function (err, res) {
			if (err) {
				console.log(err);
			} else {
				Bert.alert('Songkick ID updated', 'success', 'growl-bottom-right', 'fa-smile-o');
			}
		});
	}

	onBioChange(editorState) {

		Meteor.call('updateArtist', this.props.params.artistId, 'bio', editorState, function (err, res) {
			if (err) {
				console.log(err)
			} else {
				Bert.alert('Bio saved', 'success', 'growl-bottom-right', 'fa-smile-o');
			}
		});
	}

	render () {

		const artist = this.props.artist;

		if (!artist) {
			return <Preloader />
		}
		
		var banner = '';

		if (artist) {

			if (artist.bannerType == 'picture') {

				if (artist.localImageId) {
					banner = <img src={`/images/${artist.localImageId}?size=1200x600`} className="img-responsive"/>

				} else {
					const imageUrl = artist.imageUrl ? artist.imageUrl + '?size=100x200' : '';
					banner = <img src={imageUrl} />
				}
				
			}

			if (artist.bannerType == 'text') {
				banner = 
					<div className="text-banner">
						<div className="v-align">
							<h1>{artist.bannerText}</h1>
						</div>
					</div>
					
			}

			if (artist.bannerType == 'youtube') {

				const src = '//www.youtube.com/embed/' + artist.bannerYouTube + '?controls=0&modestbranding="1"&showinfo=0';

				banner = 
					<div className="text-banner">
						<div className="v-align">
							<h1>YouTube-video</h1>
						</div>
					</div>
			}		
		}


		const masonryOptions = {
				transitionDuration: 0
		};


		const songkickId = artist.songkickId ? artist.songkickId : '';

		const links = (artist.links && artist.links[0]) ? 
			<LinkSort 
				items={artist.links} 
				itemClass="col-xs-3 edit-links hover"
				reorder={this.reorderLinks.bind(this)}
				onClick={this.deleteLink.bind(this)}
			/> 
			: null;

		return (
			
			<div>

				<AwsUpload 
					elementId='uploadArtistBanner'
					postUploadMethod='artist.changeBanner'
					documentId={artist._id}
					done={() => this.changeBannerType('picture')}
					image 
				/>

				<div className="container-fluid">

					<div className="artist-banner" onClick={this.openEditBanner.bind(this)}>
						{banner}
					</div>
				</div>
				
				<div className="container">
					
					<div className="artist-single-content">

						<div className="row text-center" onClick={this.editName.bind(this)}>
							<h2>{artist.name}</h2>
						</div>

						<hr />

						<div className="text-center">
							<h2>LINKS</h2>
						</div>

						<br />

						<AddLink onSubmit={(link) => {this.addLink(link)}} />

						<br />

						{links}

						<hr />

						<div className="text-center">
							<h2>ABOUT</h2>
						</div>

						<BarstenEditor 
							onChange={(editorState) => {this.onBioChange(editorState)}} 
							content={artist.bio}
						/>

						<hr />

						<div className="text-center">
							<h2>SONGKICK</h2>
						</div>


						<div>
							<div className="row">

								<div className="col-xs-8">
									<input 
										type="text" 
										ref="songkickId" 
										placeholder="Songkick ID"
										defaultValue={songkickId}
										className="form-control"
									/>
								</div>

								<div className="col-xs-4 text-right">
									<button 
										onClick={this.updateSongkickId.bind(this)} 
										className="btn btn-success"
									>Add</button>
								</div>
							</div>
						</div>

						<hr />

						<div className="text-center">
							<h2>RELEASES</h2>
						</div>

						<AddRelease artistId={artist._id}/>

						<hr />

						<h4>Edit releases</h4>

						<Masonry
							className={''} // default '' 
							options={masonryOptions}
							elementType={'div'} // default 'div'
							disableImagesLoaded={false} // default false 
							updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false 
						>

							{this.props.releases.map((release) => {
						
								return <ReleaseCard key={release._id} release={release} onClick={() => {this.editRelease(release)}}/>
							})}

						</Masonry>

						<div className="row artist-single-releases">

						</div>


						<hr />
						<button className="btn btn-danger" onClick={this.deleteArtist.bind(this)}>Delete artist</button>
						<br />
					</div>
					
				</div>

			</div>
		);
	}
}

export default withTracker((params) => {
	Meteor.subscribe('artists');
	Meteor.subscribe('releases');

	const artistId = params.routeParams.artistId;

	return {
		artist: Artists.find({_id: artistId}).fetch()[0],
		releases: Releases.find({artists: {$in: [artistId]}}, {sort: {releaseDate: -1}}).fetch(),
	};
})(EditArtist);