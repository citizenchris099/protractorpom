// conf.js

var Jasmine2HtmlReporter = require('protractor-jasmine2-html-reporter');

exports.config = {
	// directConnect : true,

    capabilities : {
        // //////// desktop settings //////////
        'browserName': 'chrome',
        'version': '',
        'platform': 'ANY',
        'chromeOptions': {
            'prefs': {
                'credentials_enable_service': false,
                'profile': {
                    'password_manager_enabled': false
                }
            }
        }

        // 'browserName' : 'chrome',
        // 'browser_version' : '51.0',
        // 'os' : 'Windows',
        // 'os_version' : '10',
        // 'resolution' : '1920x1080',
        // 'resolution' : '1920x1080',
        // 'count': 1

    },

	framework : 'jasmine2',

	seleniumAddress : 'http://localhost:4444/wd/hub',

   /* onPrepare: function() {
        jasmine.getEnv().addReporter(new Jasmine2HtmlReporter({
            savePath: './test/reports/',
            screenshotsFolder: 'images',
            takeScreenshots: true,
            takeScreenshotsOnlyOnFailures: true
        }));
    },*/

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
