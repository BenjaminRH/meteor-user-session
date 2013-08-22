// This collection is where the UserSession variables are ultimately stored
UserSessionCollection = new Meteor.Collection('userSessionCollection');

// Anonymous user error
noUserError = function () {
	console.log('You cannot use UserSession methods when there is no user logged in.');
}

// Missing userId error
noUserIdError = function () {
	console.log('You cannot use UserSession methods on the server without a userId.');
}


//=======================
// = UserSession METHODS
//=======================

UserSession = {
	set: function (key, value, userId) {
		// Set a new variable in the user session
		if (Meteor.userId() || Meteor.isServer) {
			// If the user is logged in, update the variable in the collection
			if (typeof userId === 'undefined') {
				if (Meteor.isClient) userId = Meteor.userId();
				else if (Meteor.isServer) {
					noUserIdError();
					return undefined;
				}
			}
			var existing = UserSessionCollection.findOne({ key: key, userId: userId});
			var sv = { key: key, value: value, userId: userId };
			if (existing) UserSessionCollection.update({ _id: existing._id }, { $set: sv });
			else UserSessionCollection.insert(sv);
		} else {
			//XXX Maybe we should degrade to normal Session and sync on login
			noUserError();
		}
	},
	get: function (key, userId) {
		// Get the value of a user session variable
		if (Meteor.userId() || Meteor.isServer) {
			if (typeof userId === 'undefined') {
				if (Meteor.isClient) userId = Meteor.userId();
				else if (Meteor.isServer) {
					noUserIdError();
					return undefined;
				}
			}
			var existing = UserSessionCollection.findOne({ key: key, userId: userId});
			if (existing) return existing.value;
		} else {
			noUserError();
		}
	},
	delete: function (key, userId) {
		// Delete a user session variable, if it exists
		if (Meteor.userId() || Meteor.isServer) {
			if (typeof userId === 'undefined') {
				if (Meteor.isClient) userId = Meteor.userId();
				else if (Meteor.isServer) {
					noUserIdError();
					return undefined;
				}
			}
			var existing = UserSessionCollection.findOne({ key: key, userId: userId});
			if (existing) UserSessionCollection.remove(existing._id);
		} else {
			noUserError();
		}
	},
	equals: function (key, value, userId) {
		// Test if a user session variable is equal to a value
		if (Meteor.userId() || Meteor.isServer) {
			if (typeof userId === 'undefined') {
				if (Meteor.isClient) userId = Meteor.userId();
				else if (Meteor.isServer) {
					noUserIdError();
					return undefined;
				}
			}
			var existing = UserSessionCollection.findOne({ key: key, userId: userId});
			if (existing) return existing.value == value; //XXX Should this be ===
		} else {
			noUserError();
		}
	},
	list: function (userId) {
		// Get all the user session variables as an object
		if (Meteor.userId() || Meteor.isServer) {
			if (typeof userId === 'undefined') {
				if (Meteor.isClient) userId = Meteor.userId();
				else if (Meteor.isServer) {
					noUserIdError();
					return undefined;
				}
			}
			var existing = UserSessionCollection.findOne({ userId: userId});
			if (existing) {
				var list = {};
				UserSessionCollection.find({ userId: userId }).forEach(function (sv) {
					list[sv.key] = sv.value;
				});
				return list;
			}
		} else {
			noUserError();
		}
	}
};