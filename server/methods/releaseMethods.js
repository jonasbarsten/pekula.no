Meteor.methods({
	'addRelease': function (release) {

		if ( Roles.userIsInRole(Meteor.userId(), ['super-admin', 'admin'], 'CMS')) {

			if (release.spotifyRaw) {
				var spotifyId = release.spotifyRaw.id;
			}

			let existingRelease = Releases.findOne({name: release.name, albumType: release.albumType});

			if (existingRelease) {

				// Duplicate

				// Check if the release is already in db, if so add the artist to its artist array if not already there

				// Check if supplied release has artists array
				if (release.artists) {

					// Check if existing release contains artists array 
					if (existingRelease.artists) {

						// Check if supplied artist is already in existing array
						if (existingRelease.artists.indexOf(release.artists[0]) == -1) {
							Releases.update({_id: existingRelease._id}, {$push: {artists: release.artists[0]}});
						}
					}
				}
				
			} else {
				let newRelease = Releases.insert(release);

				var ids = {
					localReleaseId: newRelease
				};

				if (spotifyId) {
					ids['spotifyReleaseId'] = spotifyId;
				}

				return ids;
			}
		}
		
	},
	'release.delete': function (releaseId) {

		if ( Roles.userIsInRole(Meteor.userId(), ['super-admin', 'admin'], 'CMS')) {

			// Delete files associated with artist from s3
			var release = Releases.findOne({_id: releaseId});

			if (release.localImageId) {
				Meteor.call('file.toTrash', release.localImageId, 'image', (err, res) => {
					if (err) {
						console.log(err);
					}
				});
			}

			// Delete artist
			Releases.remove({_id: releaseId});

		}
	},
	'release.changeName': function (releaseId, newName) {

		if ( Roles.userIsInRole(Meteor.userId(), ['super-admin', 'admin'], 'CMS')) {

			Releases.update({_id: releaseId}, {$set: {name: newName}});
		}
	},
	'release.changeImage': function (releaseId, file) {
		if ( Roles.userIsInRole(Meteor.userId(), ['super-admin', 'admin'], 'CMS')) {

			const previousImage = Releases.findOne({_id: releaseId, localImageId: {$exists: true}}, {fields: {localImageId: 1, _id: 0}});

			Releases.update({_id: releaseId}, {$set: {localImageId: file.localId}});

			if (previousImage) {
				Meteor.call('file.toTrash', previousImage.localImageId, 'image', (err, res) => {
					if (err) {
						console.log(err);
					};
				});
			}
		}
	},
	// 'changeReleaseImage': function (releaseId, imageId) {

	// 	if ( Roles.userIsInRole(Meteor.userId(), ['super-admin', 'admin'], 'CMS')) {

	// 		// Get old image id
	// 		var release = Releases.findOne({_id: releaseId});

	// 		if (release.localImageId) {
	// 			var oldId = release.localImageId;
	// 		}

	// 		// Update to new image
	// 		var link = UserFiles.findOne({_id: imageId}).link();

	// 		Releases.update({_id: releaseId}, {$set: {
	// 			imageUrl: link,
	// 			localImageId: imageId,
	// 			lastChanged: new Date()
	// 		}});

	// 		// Remove old image
	// 		if (oldId) {
	// 			UserFiles.remove({_id: oldId});
	// 		}
	// 	}
		
	// },
	'changeReleaseDate': function (releaseId, date) {

		if ( Roles.userIsInRole(Meteor.userId(), ['super-admin', 'admin'], 'CMS')) {

			Releases.update({_id: releaseId}, {$set: {releaseDate: date}});
		}
	},
	'release.changeType': function (releaseId, type) {

		if ( Roles.userIsInRole(Meteor.userId(), ['super-admin', 'admin'], 'CMS')) {

			Releases.update({_id: releaseId}, {$set: {albumType: type}});
		}
	},

	'release.addLink': function (releaseId, link) {

		if ( Roles.userIsInRole(Meteor.userId(), ['super-admin', 'admin'], 'CMS')) {
			Releases.update({_id: releaseId}, {$push: {links: link}});
		}
	},
	'removeLinkFromRelease': function (link, releaseId) {

		// Schema validation done by simple schema
		if ( Roles.userIsInRole(Meteor.userId(), ['super-admin', 'admin'], 'CMS')) {

			Releases.update({_id: releaseId}, {$pull: {links: {id: link.id}}});
		}
	},
	'updateReleaseAbout': function (releaseId, about) {
		if ( Roles.userIsInRole(Meteor.userId(), ['super-admin', 'admin'], 'CMS')) {
			Releases.update({_id: releaseId}, {$set: {about: about}});
		}
	},
	'attachReleaseToArtist': function (artistId, release) {
		
		if ( Roles.userIsInRole(Meteor.userId(), ['super-admin', 'admin'], 'CMS')) {
			// $push will not create array if it doen't exist, $addToSet also only adds element if it doesn't already exist
			Releases.update({_id: release._id}, {$addToSet: {artists: artistId}});
		}
	},
	'detachArtistFromRelease': function (artistId, releaseId) {

		if ( Roles.userIsInRole(Meteor.userId(), ['super-admin', 'admin'], 'CMS')) {
			Releases.update({_id: releaseId}, {$pull: {artists: artistId}});
		}
	},
	'release.reorderLinks': function (releaseId, links) {

		if ( Roles.userIsInRole(Meteor.userId(), ['super-admin', 'admin'], 'CMS')) {
			Releases.update({_id: releaseId}, {$set: {links: links}});
		}
	},
})