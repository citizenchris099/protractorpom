// conf.js
exports.config = {
	// directConnect : true,

	capabilities : {
		'browserstack.user' : 'chrismanning1',
		'browserstack.key' : 'RXqoAFZLbgBpVNY91AsY',

		// Needed for testing localhost
		'browserstack.local' : 'true',
		'browserstack.localIdentifier' : 'Test123',

		// //////// desktop settings //////////
		'browserName' : 'chrome',
		'browser_version' : '54.0',
		'os' : 'Windows',
		'os_version' : '10',
		'resolution' : '1920x1080',
		'count': 1
	},

	framework : 'jasmine2',

	// seleniumAddress : 'http://localhost:4444/wd/hub',
	seleniumAddress : 'http://hub.browserstack.com/wd/hub',

	specs : [ '../tests/load_spec.js',
		'../tests/multi_browser_spec.js'],

	// Options to be passed to Jasmine.
	jasmineNodeOpts : {
		showColors : true,
		defaultTimeoutInterval : 1200000,
		isVerbose : true,
		showColors : true,
		includeStackTrace : true
	},
	params:{
		environment:{
			url:'http://localhost:3000',
			type:'smoke',
			toTest:'all',
            multiBrowser: 'no',
			client: 'client 2',
            site: 'site 3',
			team:'team 3'
		}
	}
};
