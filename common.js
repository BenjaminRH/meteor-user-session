// This collection is where the UserSession variables are ultimately stored
UserSessionCollection = new Meteor.Collection('userSessionCollection');

// Resolves userId depending on current execution environment
function resolveUserId(userId) {
	if (Meteor.isServer) {
		if (typeof userId === 'undefined') {
			console.log('You cannot use UserSession methods on the server without a userId.');
			return undefined;
		}
	}
	// ignore input userId using userId of current user
	// since on client environment users cannot read settings of other users
	userId = Meteor.userId();
	if (!userId) {
		console.log('You cannot use UserSession methods when there is no user logged in.');
	}
	return userId;
}

// Calls given function with existing variable or returns defval if var does not exist
function invoke(key, userId, defval, fn) {
	userId = resolveUserId(userId);
	if (!userId) return defval;
	var selector = {userId: userId};
	if (key) selector.key = key;
	var existing = UserSessionCollection.findOne(selector);
	return existing ? fn(existing) : defval;
}

//=======================
// = UserSession METHODS
//=======================

UserSession = {
	// Sets a new variable in the user session
	set: function (key, value, userId) {
		userId = resolveUserId(userId);
		if (!userId) return undefined;
		var existing = UserSessionCollection.findOne({ key: key, userId: userId});
		var sv = { key: key, value: value, userId: userId };
		if (existing) UserSessionCollection.update({ _id: existing._id }, { $set: sv });
		else UserSessionCollection.insert(sv);
	},
	// Gets the value of a user session variable
	get: function (key, userId) {
		return invoke(key, userId, undefined, function(it){
			return it.value;
		});
	},
	// Deletes a user session variable, if it exists
	delete: function (key, userId) {
		return invoke(key, userId, undefined, function(it){
			return UserSessionCollection.remove(it._id);
		});
	},
	// Tests if a user session variable is equal to a value
	equals: function (key, value, userId) {
		return invoke(key, userId, false, function(it){
			return it.value == value; //XXX Should this be ===
		});
	},
	// Gets all the user session variables as an object
	list: function (userId) {
		return invoke(null, userId, {}, function(){
			var list = {};
			UserSessionCollection.find({userId: userId}).forEach(function(it) {
				list[it.key] = it.value;
			});
			return list;
		});
	},
	// Determines whether given variable exists in user session
	has: function (key, userId) {
		return invoke(key, userId, false, function(){
			return true;
		});
	}
};