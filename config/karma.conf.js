var webpackConfig = require('./webpack.test');

module.exports = function (config) {
  var _config = {
    basePath: '',

    frameworks: ['jasmine'],

    files: [
      // For some reason, CoreJS fail to polyfill PhantomJS's Array. Had to include other polyfill
      {pattern: './node_modules/phantomjs-polyfill-includes/includes-polyfill.js', watched: false},
      {pattern: './lib/vendor.bundle.js', watched: false},
      {pattern: './config/tests-runner-karma.js', watched: false}
    ],

    preprocessors: {
      './config/tests-runner-karma.js': ['webpack', 'sourcemap']
    },

    webpack: webpackConfig,

    webpackMiddleware: {
      stats: 'warnings'
    },

    webpackServer: {
      noInfo: false
    },

    browserConsoleLogOptions: {
      level: 'log',
      terminal: true
    },

    reporters: ['spec'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ['PhantomJS'],
    singleRun: true
  };

  config.set(_config);
};
