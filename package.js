Package.describe({
	summary: "Provides a UserSession object that works just like Session does, except it's persistent so you can preserve state across devices *and* sessions."
});

var both = ['client', 'server']

Package.on_use(function (api) {
	api.use('underscore', both);
	if (typeof api.imply !== 'undefined') {
		api.imply('underscore', both);
	}

	api.add_files(['client.js'], 'client');
	api.add_files(['server.js'], 'server');
	api.add_files(['common.js'], both);

	if (typeof api.export !== 'undefined') {
		api.export(['UserSession', 'UserSessionCollection'], both);
	}
});