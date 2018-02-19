import SimpleSchema from 'simpl-schema';

Posts = new Mongo.Collection( 'posts' );

Posts.allow({
	insert: () => false,
	update: () => false,
	remove: () => false
});

Posts.deny({
	insert: () => true,
	update: () => true,
	remove: () => true
});

const PostsSchema = new SimpleSchema({
	"heading": {
		type: String
	},
	"urlFriendlyHeading": {
		type: String,
		optional: true
	},
	"text": {
		type: String,
		optional: true
	},
	"relatedId": {
		type: String,
		optional: true
	},
	"type": {
		type: String
	},
	"views": {
		type: Number,
		optional: true
	},
	"localImageId": {
		type: String,
		optional: true
	},
	"lastChanged": {
		type: Date
	},
	"dateCreated": {
		type: Date
	},
	"createdBy": {
		type: String
	}
});

Posts.attachSchema( PostsSchema );