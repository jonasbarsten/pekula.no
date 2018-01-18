Meteor.methods({
	'page.add': function (pageName, urlFriendlyName) {

		let exists = Pages.findOne({urlFriendlyName: urlFriendlyName});

		if (exists) {
			return 'exists';
		}

		var page = {
			name: pageName,
			urlFriendlyName: urlFriendlyName,
			lastChanged: new Date,
			lastChangedBy: Meteor.userId(),
			views: 0,
			created: new Date,
			createdBy: Meteor.userId()
		}

		Pages.insert(page);
	},
	'page.delete': function (urlFriendlyName) {
		Pages.remove({urlFriendlyName: urlFriendlyName});
	},
	'page.update': function (urlFriendlyName, content) {
		Pages.update({urlFriendlyName: urlFriendlyName}, {$set: {content: content}});
	},
	'togglePageInMenu': function (urlFriendlyName) {
		const page = Pages.findOne({urlFriendlyName: urlFriendlyName});

		if (page.isInMenu) {
			Pages.update({urlFriendlyName: urlFriendlyName}, {$set: {isInMenu: false}});
			return 'removed';
		} else {
			Pages.update({urlFriendlyName: urlFriendlyName}, {$set: {isInMenu: true}});
			return 'added';
		}

	},
	'page.view': function (urlFriendlyName) {

		// If non-logged-in-user views page, log view
		if (!Meteor.userId()) {
			Pages.update({urlFriendlyName: urlFriendlyName}, {$inc: {views: 1}});
		}
	}

	// This method places artist-images in trash if they are not in pages FIXFIX
	// 'page.moveUnusedEditorImagesToTrash': function () {

	// 	var usedImages = [];

	// 	const allPages = Pages.find().fetch();

	// 	allPages.map((page) => {

	// 		if (page.content && page.content.editorState && page.content.editorState.entityMap) {
	// 			const length = Object.keys(page.content.editorState.entityMap).length;

	// 			for (var i = 0; i < length; i++) {
	// 				const key = i.toString();

	// 				if (page.content.editorState.entityMap[key].type == 'IMAGE') {
	// 					var awsKey = page.content.editorState.entityMap[key].data.src;

	// 					awsKey = awsKey.split("/");
	// 					usedImages.push(awsKey[awsKey.length - 1]);
	// 				};
	// 			};
	// 		};
	// 	});

	// 	const imagesToTrash = Images.find(
	// 		{
	// 			awsKey: { $nin: usedImages },
	// 			inTrash: { $ne: true },
	// 			deletedFromS3: { $ne: true }
	// 		}, 
	// 		{
	// 			fields: {_id: 1}
	// 		}
	// 	).fetch();

	// 	imagesToTrash.map((image) => {
	// 		Meteor.call('file.toTrash', image._id, 'image');
	// 	});
	// }
});