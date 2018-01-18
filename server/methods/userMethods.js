Meteor.methods({
	inviteUser (email) {
		// Only allow inviting users if has role admin or manage-users
		if ( Roles.userIsInRole(Meteor.userId(), ['super-admin', 'admin'], 'CMS')) {

    		check(email, String);

			let inviteExists = Invites.findOne( { email: email } );

			// TODO:
			// let userAlreadyRegistered = Meteor.users.findOne(Hvor emails inneholder email)
			let token = Random.hexString( 15 );

			if ( !inviteExists ) {

				// Add invite to database
				Invites.insert({
			        email: email,
			        token: token,
			        assignedRoles: ['admin'],
			        globalGroup: false,
			        roleGroup: 'CMS',
			        dateInvited: new Date(),
			        invitedBy: Meteor.userId()
				});
				
				// Generate HTML template for mail invite from /private/email/templates/invite.html
				SSR.compileTemplate( 'inviteEmail', Assets.getText( 'email/templates/invite.html' ) );

				// Send invite
				Email.send({
					to: email,
					from: 'Pekula WEB<no-reply@pekula.no>',
					subject: 'Pekula WEB // Admin invite',
					html: SSR.render( 'inviteEmail', {
						url: Meteor.settings.public.url + '/login/invite/' + token + '?email=' + email
					})
				});

			} else {
				console.log('User already invited');
			}
		} else {

			throw new Meteor.Error( 'bad-match', 'You are not authorized to invite users' );
		}

	},
	createInvitedUser( user ) {

		check( user, {
			email: ValidEmail,
			firstName: String,
			lastName: String,
			password: Object,
			token: String
		});

		const profile = {};
		profile.firstName = user.firstName;
		profile.lastName = user.lastName;

		// Check if token exists and if it's corresponding email matched the email input
		let invite = Invites.findOne( { email: user.email, token: user.token }, { fields: { "_id": 1, "assignedRoles": 1, "roleGroup": 1 } } );

		if ( invite ) {

			// Create user
			let userId = Accounts.createUser( { profile: profile, email: user.email, password: user.password } );

			// Give user roles
			Roles.addUsersToRoles( userId, invite.assignedRoles, invite.roleGroup );

			// Remove token
			// Invites.update( invite._id, {
			// 	$set: { accountCreated: true },
			// 	$unset: { token: "" }
			// });

			// Remove invite so that if user is deleted, the same email can be invited again

			Invites.remove(invite._id);

		} else {
			throw new Meteor.Error( 'bad-match', 'Hmm, this token doesn\'t match your email. Try again?' );
		}
	},
	deleteInvite (email) {
		check(email, String);

		if ( Roles.userIsInRole(Meteor.userId(), ['super-admin', 'admin', 'manage-users'])) {
			Invites.remove({'email': email});
		}	
	}
});