import cron from 'cron';

Meteor.startup(() => {

	// Garbage collection

	var emptyTrash = new cron.CronJob({
		cronTime: '58 * * * *',
		onTick: Meteor.bindEnvironment(function() {

			// This method places artist-images in trash if they are not in pages FIXFIX
			// Meteor.call('page.moveUnusedEditorImagesToTrash');
			Meteor.call('files.emptyTrash');
			Meteor.call('files.compareAndDelete');

		}),
		start: false,
		timeZone: "Europe/Oslo"
	});

	emptyTrash.start();

});