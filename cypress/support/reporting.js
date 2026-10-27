import * as allure from "allure-js-commons";

export function reportTest(id, feature, severity) {
  allure.feature(feature);
  allure.story(id);
  allure.severity(severity);
  allure.tags("e2e", "ui");
  allure.tms("https://automationexercise.com/test_cases", id);
  allure.parameter("browser", Cypress.browser.displayName);
}
