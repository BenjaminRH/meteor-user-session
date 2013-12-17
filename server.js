// Publish only the current user's session variables to the client
Meteor.publish('userSessionCollection', function () {
	return UserSessionCollection.find({ userId: this.userId });
});

// Check that the userId specified owns the documents
ownsDocument = function (userId, doc) {
	return doc && doc.userId === userId;
};

// Allow methods for UserSessionCollection (security)
UserSessionCollection.allow({
	insert: function (userId, doc) {
		return ownsDocument(userId, doc);
	},
	update: function (userId, doc) {
		return ownsDocument(userId, doc);
	},
	remove: function (userId, doc) {
		return ownsDocument(userId, doc);
	}
});