// conf.js
exports.config = {
	// directConnect : true,

	multiCapabilities : [ {
		'browserstack.user' : 'richardworth4',
		'browserstack.key' : 'gGUvEysteVdvpEwFPFLK',

		// Needed for testing localhost
		'browserstack.local' : 'true',
		'browserstack.localIdentifier' : 'Test123',

		'browserName' : 'chrome',
		'browser_version' : '46.0',
		'os' : 'Windows',
		'os_version' : '10',
		'resolution' : '1024x768'
	}, {
		'browserstack.user' : 'richardworth4',
		'browserstack.key' : 'gGUvEysteVdvpEwFPFLK',

		// Needed for testing localhost
		'browserstack.local' : 'true',
		'browserstack.localIdentifier' : 'Test123',

		'browser' : 'Firefox',
		'browser_version' : '42.0',
		'os' : 'Windows',
		'os_version' : '10',
		'resolution' : '1024x768'
	}

	],

	framework : 'jasmine2',

	seleniumAddress : 'http://hub.browserstack.com/wd/hub',

	specs : [ '../tests/desktop_spec.js' ],

	// Options to be passed to Jasmine.
	jasmineNodeOpts : {
		showColors : true,
		defaultTimeoutInterval : 30000
	}
};
