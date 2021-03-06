'use strict';

var browsers = {
	chrome: new LocalBrowserFactory({
		browser: 'chrome'
	}),
	chromeWindows: new SauceBrowserFactory({
		browser: 'Chrome',
		platform: 'WIN10'
	}),
	/*firefoxWindows: new SauceBrowserFactory({
		browser: 'Firefox',
		platform: 'WIN10'
	}),*/
	ie11Windows: new SauceBrowserFactory({
		browser: 'internet explorer',
		version: '11',
		platform: 'WIN10'
	}),
	/*edgeWindows: new SauceBrowserFactory({
		browser: 'microsoftedge',
		platform: 'WIN10'
	}),*/
	chromeMac: new SauceBrowserFactory({
		browser: 'Chrome',
		platform: 'SIERRA',
		/* crashes during screenshot command on > 2.24
			https://bugs.chromium.org/p/chromedriver/issues/detail?id=1770# */
		desiredCapabilities: {
			chromedriverVersion: '2.24'
		}
	}),
	/*safariMac: new SauceBrowserFactory({
		browser: 'Safari',
		platform: 'SIERRA'
	}),*/
	firefoxMac: new SauceBrowserFactory({
		browser: 'Firefox',
		platform: 'SIERRA'
	})
};

var mainlineEndpoint = 'http://localhost:8081/components/d2l-link/test/acceptance/link.html';
var xEndpoint = 'http://localhost:8000/components/d2l-link/test/acceptance/link.html';
var spec = 'test/acceptance/link.gspec';
var shadowSpec = 'test/acceptance/link.shadow.gspec';

polymerTests(browsers, function(test) {

	/* we have to force shady-DOM, because there's no way to get /deep/
	 * selectors working with Polymer 2 */
	test('mainline-button-shady', {
		endpoint: mainlineEndpoint + '?wc-shadydom=true&wc-ce=true',
		spec: spec,
		size: '1024x768',
		tags: ['desktop']
	});

	test.shadow('1.x-button-shadow', {
		endpoint: xEndpoint + '?dom=shadow',
		spec: shadowSpec,
		size: '1024x768',
		tags: ['desktop']
	});

	test('1.x-button-shady', {
		endpoint: xEndpoint + '?wc-shadydom=true&wc-ce=true',
		spec: spec,
		size: '1024x768',
		tags: ['desktop']
	});

});
