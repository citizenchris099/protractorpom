// conf.js
exports.config = {
	// directConnect : true,

	capabilities : {
		browserName : 'safari',
		'appium-version' : '1.0',
		platformName : 'iOS',
		platformVersion : '9.2',
		deviceName : 'iPhone Simulator',
	},

	baseUrl : 'http://localhost:3000',

	framework : 'jasmine2',

	seleniumAddress : 'http://localhost:4723/wd/hub',

	specs : [ '../tests/mobile_spec.js' ],

	// Options to be passed to Jasmine.
	jasmineNodeOpts : {
		showColors : true,
		defaultTimeoutInterval : 60000,
		isVerbose : true,
		showColors : true,
		includeStackTrace : true
	},
	// configuring wd in onPrepare
	// wdBridge helps to bridge wd driver with other selenium clients
	// See https://github.com/sebv/wd-bridge/blob/master/README.md
//	onPrepare : function() {
//		var wd = require('wd'), protractor = require('protractor'), wdBridge = require('wd-bridge')(protractor, wd);
//		wdBridge.initFromProtractor(exports.config);
//	}
};
