import "cypress-mochawesome-reporter/register";
import "allure-cypress";

beforeEach(() => {
  // Apenas publicidade externa: nenhuma resposta funcional da aplicação é simulada.
  [
    "**/*.doubleclick.net/**",
    "**/*.googlesyndication.com/**",
    "**/*.googleadservices.com/**",
  ].forEach((url) => cy.intercept(url, { statusCode: 204, body: "" }));
});
