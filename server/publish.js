Meteor.publish('allUsers', function () {

	const isAdmin = Roles.userIsInRole(this.userId, ['admin', 'super-admin'], 'CMS');

	if (isAdmin) {
		return Meteor.users.find({}, {fields: {"profile": 1, "emails": 1, "createdAt": 1, "roles": 1, "status": 1}});
	} else {
		return null;
	} 
});

Meteor.publish('artists', function () {
	return Artists.find();
});

Meteor.publish('releases', function () {
	return Releases.find();
});

Meteor.publish('tracks', function () {
	return Tracks.find();
});

Meteor.publish('pages', function () {
	return Pages.find();
});

Meteor.publish('images', function () {
	return Images.find();
});

Meteor.publish('posts', function () {
	return Posts.find();
});