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
			localImageId: post.image,
			lastChanged: new Date(),
			dateCreated: new Date(),
			createdBy: Meteor.userId()
		};

		Posts.insert(newPost);
	}
});