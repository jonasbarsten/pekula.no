Meteor.methods({
	'artist.add': function (artist) {

		if ( Roles.userIsInRole(Meteor.userId(), ['super-admin', 'admin'], 'CMS')) {
			var artistExists = Artists.findOne({'nameLower': artist.name.toLowerCase()});

			if (artistExists) {
				return 'exists'
			} else {
				let newArtist = Artists.insert(artist);
				return newArtist;
			}
		}
	},
	'artist.delete': function (artistId) {

		if ( Roles.userIsInRole(Meteor.userId(), ['super-admin', 'admin'], 'CMS')) {
			var artist = Artists.findOne({_id: artistId});

			if (artist.localImageId) {
				Meteor.call('file.toTrash', artist.localImageId, 'image', (err, res) => {
					if (err) {
						console.log(err);
					}
				});
			}
			Artists.remove({_id: artistId});
		}
	},

	'artist.changeName': function (artistId, newName) {

		if ( Roles.userIsInRole(Meteor.userId(), ['super-admin', 'admin'], 'CMS')) {

			const newNameLower = newName.toLowerCase();

			Artists.update({_id: artistId}, {$set: {name: newName, nameLower: newNameLower}});
		}
	},

	'artist.changeBanner': function (artistId, file) {
		if ( Roles.userIsInRole(Meteor.userId(), ['super-admin', 'admin'], 'CMS')) {

			const previousBanner = Artists.findOne({_id: artistId, localImageId: {$exists: true}}, {fields: {localImageId: 1, _id: 0}});

			Artists.update({_id: artistId}, {$set: {localImageId: file.localId}});

			if (previousBanner) {
				Meteor.call('file.toTrash', previousBanner.localImageId, 'image', (err, res) => {
					if (err) {
						console.log(err);
					};
				});
			}
		}
	},

	'changeArtistImage': function (artistId, imageId) {


		if ( Roles.userIsInRole(Meteor.userId(), ['super-admin', 'admin'], 'CMS')) {

			// Get old image id
			var artist = Artists.findOne({_id: artistId});

			if (artist.localImageId) {
				var oldId = artist.localImageId;
			}

			// Update to new image
			var link = UserFiles.findOne({_id: imageId}).link();

			Artists.update({_id: artistId}, {$set: {
				imageUrl: link,
				localImageId: imageId,
				lastChanged: new Date()
			}});

			// Remove old image
			if (oldId) {
				UserFiles.remove({_id: oldId});
			}

		}

	},
	'updateArtist': function (artistId, field, content) {

		if ( Roles.userIsInRole(Meteor.userId(), ['super-admin', 'admin'], 'CMS')) {

			var setObject = {}

			setObject[field] = content;

			Artists.update(
				{_id: artistId},
				{
					$set: setObject
				}
			);
		}
	},

	'artist.addLink': function (artistId, link) {

		if ( Roles.userIsInRole(Meteor.userId(), ['super-admin', 'admin'], 'CMS')) {
			Artists.update({_id: artistId}, {$push: {links: link}});
		}
	},

	'artist.removeLink': function (artistId, link) {

		if ( Roles.userIsInRole(Meteor.userId(), ['super-admin', 'admin'], 'CMS')) {
			Artists.update({_id: artistId}, {$pull: {links: {id: link.id}}});
		}
	},

	'artist.reorderLinks': function (artistId, links) {

		if ( Roles.userIsInRole(Meteor.userId(), ['super-admin', 'admin'], 'CMS')) {
			Artists.update({_id: artistId}, {$set: {links: links}});
		}
	},

	'updateSongkickId': function (artistId, songkickId) {

		if ( Roles.userIsInRole(Meteor.userId(), ['super-admin', 'admin'], 'CMS')) {
			Artists.update({_id: artistId}, {$set: {songkickId: songkickId}});
		}
	},

	'changeArtistBannerType': function (artistId, type) {

		if ( Roles.userIsInRole(Meteor.userId(), ['super-admin', 'admin'], 'CMS')) {
			Artists.update({_id: artistId}, {$set: {bannerType: type}});
		}
	},

	'artist.changeBannerText': function (artistId, text) {

		console.log(artistId);
		console.log(text);

		if ( Roles.userIsInRole(Meteor.userId(), ['super-admin', 'admin'], 'CMS')) {
			Artists.update({_id: artistId}, {$set: {bannerText: text}});
		}
	},

	'changeArtistBannerYouTube': function (artistId, url) {

		if ( Roles.userIsInRole(Meteor.userId(), ['super-admin', 'admin'], 'CMS')) {
			Artists.update({_id: artistId}, {$set: {bannerYouTube: url}});
		}
	},

	'incrementArtistViews': function () {

		const date = new Date();

		const month = date.getUTCMonth() + 1;
		const year = date.getUTCFullYear();

		// If non-logged-in-user views, log view
		if (!Meteor.userId()) {
			Artists.update({}, {$push: {views: date}});
			// Artists.update({}, {$set: {}}, {'upsert': true});
		}
	},
	'subscribeToNewsletter': function (subscriber) {

		const data = {
			email: subscriber.email,
			// first_name: subscriber.firstName,
			// last_name: subscriber.lastName
		};

		const userName = Meteor.settings.private.directMail.id;
		const password = Meteor.settings.private.directMail.secret;
		const documentIdentifier = Meteor.settings.private.directMail.documentIdentifier;
		const addressGroupId = Meteor.settings.private.directMail.addressGroupId;

		const auth = userName + ':' + password;

		const request = 'https://secure.directmailmac.com/api/v2/' + 'projects/' + documentIdentifier + '/address-groups/' + addressGroupId + '/addresses';

		HTTP.call('POST', request, {
			auth: auth,
			data: data
		}, (err, res) => {
			if (err) {
				console.log(err);
			}
		});
	}
})