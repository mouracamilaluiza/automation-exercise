const { defineConfig } = require("cypress");

module.exports = defineConfig({
  viewportWidth: 1366,
  viewportHeight: 900,
  video: true,
  screenshotOnRunFailure: true,
  allowCypressEnv: false,
  defaultCommandTimeout: 10000,
  pageLoadTimeout: 90000,
  requestTimeout: 20000,
  responseTimeout: 30000,
  retries: { runMode: 0, openMode: 0 },
  reporter: "cypress-mochawesome-reporter",
  reporterOptions: {
    reportDir: "cypress/reports",
    reportPageTitle: "Automation Exercise - Test Report",
    embeddedScreenshots: true,
    inlineAssets: true,
    saveJson: true,
    removeJsonsFolderAfterMerge: false,
  },
  e2e: {
    baseUrl: "https://automationexercise.com",
    specPattern: "cypress/e2e/**/*.cy.js",
    testIsolation: true,
    setupNodeEvents(cypressOn, config) {
      // Ambos os reporters precisam receber after:spec e after:run.
      const on = require("cypress-on-fix")(cypressOn);
      require("cypress-mochawesome-reporter/plugin")(on);
      require("allure-cypress/reporter").allureCypress(on, config, {
        resultsDir: "allure-results",
        videoOnFailOnly: true,
        environmentInfo: {
          application: config.baseUrl,
          node: process.version,
          platform: process.platform,
        },
      });
      return config;
    },
  },
});
