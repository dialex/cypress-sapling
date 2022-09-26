const { defineConfig } = require('cypress')

module.exports = defineConfig({
  screenshotsFolder: 'artifacts/screenshots',
  video: false,
  videosFolder: 'artifacts/videos',
  videoUploadOnPasses: false,
  viewportHeight: 660,
  viewportWidth: 1300,
  watchForFileChanges: true,
  env: {
    abortStrategy: 'run',
    env: 'stg',
    isDebug: false,
  },
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.js')(on, config)
    },
  },
})
