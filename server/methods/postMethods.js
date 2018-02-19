Meteor.methods({
	'post.add': function (post) {
		check(post, Object);

		var urlFriendlyHeading = post.heading.replace(/[^\w\s]/gi, '');
		urlFriendlyHeading = urlFriendlyHeading.replace(/\s+/g, '-').toLowerCase();

		const newPost = {
			heading: post.heading,
			urlFriendlyHeading: urlFriendlyHeading,
			text: post.text,
			type: post.type,
			relatedId: post.relatedId,
			localImageId: post.image,
			lastChanged: new Date(),
			dateCreated: new Date(),
			createdBy: Meteor.userId()
		};

		Posts.insert(newPost);
	},
	'post.remove': function (postId) {
		check(postId, String);

		if ( Roles.userIsInRole(Meteor.userId(), ['super-admin', 'admin'], 'CMS')) {
			const post = Posts.findOne({_id: postId});

			if (post.localImageId) {
				Meteor.call('file.toTrash', post.localImageId, 'image', (err, res) => {
					if (err) {
						console.log(err);
					}
				});
			}
			Posts.remove({_id: postId});
		}
	}
});