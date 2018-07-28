exports.config = {

    capabilities: {
        'browserName': 'chrome',
        'chromeOptions': {
            'mobileEmulation' : {
                'deviceName': 'Google Nexus 7'
            }
        }
    },

	framework : 'jasmine2',

	seleniumAddress : 'http://localhost:4444/wd/hub',

	specs : [ '../tests/mobile_spec.js'],

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