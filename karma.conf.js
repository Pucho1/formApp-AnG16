process.env.CHROME_BIN = '/usr/bin/google-chrome';

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],

    browsers: ['ChromeHeadlessCI'],
    customLaunchers: {
      ChromeHeadlessCI: {
        base: 'ChromeHeadless',
        flags: [
          '--no-sandbox',
          '--disable-gpu',
          '--disable-setuid-sandbox',
          '--disable-dev-shm-usage',
          '--disable-extensions'
        ]
      }
    },

    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'), // ✅ INDISPENSABLE
      require('karma-jasmine-html-reporter'),
      require('karma-coverage'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],

    reporters: ['progress', 'kjhtml'],
    singleRun: true,
    restartOnFileChange: false,
    browserNoActivityTimeout: 120000,
    captureTimeout: 120000,
  });
};
