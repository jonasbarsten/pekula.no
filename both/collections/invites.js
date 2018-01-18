import SimpleSchema from 'simpl-schema';

Invites = new Mongo.Collection( 'invites' );

Invites.allow({
	insert: () => false,
	update: () => false,
	remove: () => false
});

Invites.deny({
	insert: () => true,
	update: () => true,
	remove: () => true
});

const InvitesSchema = new SimpleSchema({
	"email": {
		type: String
	},
	"token": {
		type: String
	},
	"assignedRoles": {
		type: Array
	},
	"assignedRoles.$": {
		type: String
	},
	"globalGroup": {
		type: Boolean
	},
	"roleGroup": {
		type: String
	},
	"dateInvited": {
		type: Date
	},
	"invitedBy": {
		type: String
	}
});

Invites.attachSchema( InvitesSchema );