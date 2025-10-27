// karma.conf.js
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
    reporters: ['progress', 'kjhtml'],
    singleRun: true,
    restartOnFileChange: false,
    browserNoActivityTimeout: 120000,
    captureTimeout: 120000,
  });
};
