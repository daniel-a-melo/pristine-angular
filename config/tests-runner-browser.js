/**
 * Starts the tests for running with Jasmine runner
 */

Error.stackTraceLimit = Infinity;

window.jasmineRequire = require("jasmine-core/lib/jasmine-core/jasmine.js");
require("jasmine-core/lib/jasmine-core/jasmine-html.js");
require("jasmine-core/lib/jasmine-core/boot.js");

//require('zone.js/dist/zone');
require('zone.js/dist/long-stack-trace-zone');
require('zone.js/dist/proxy');
require('zone.js/dist/sync-test');
require('zone.js/dist/jasmine-patch');
require('zone.js/dist/async-test');
require('zone.js/dist/fake-async-test');

var appContext = require.context('../src', true, /\.spec\.ts/);
appContext.keys().forEach(appContext);

var testing = require('@angular/core/testing');
var browser = require('@angular/platform-browser-dynamic/testing');

testing.TestBed.initTestEnvironment(browser.BrowserDynamicTestingModule, browser.platformBrowserDynamicTesting());

require('jasmine-core/lib/jasmine-core/jasmine.css');