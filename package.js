Package.describe({
	summary: "Provides a UserSession object that works just like Session does, except it's persistent so you can preserve state across devices *and* sessions."
});

var both = ['client', 'server']

Package.on_use(function (api) {
	api.use('underscore', both);
	api.use('deps', both);
	api.use('session', both);
	api.use('livedata', both);
	api.use('mongo-livedata', both);

	api.add_files('common.js', both);
	api.add_files('server.js', 'server');
	api.add_files('client.js', 'client');

	if (typeof api.export !== 'undefined') {
		api.export(['UserSession', 'UserSessionCollection'], both);
	}
});