import { shop } from "../pages/shop";
import { newUser } from "../support/user";
import { reportTest } from "../support/reporting";

describe("Inscrição", () => {
  it("TC10 — assinar novidades pelo rodapé", () => {
    reportTest("TC10", "Inscrição", "normal");
    shop.home();
    cy.get("#footer").scrollIntoView();
    cy.contains("#footer h2", "Subscription").should("be.visible");
    cy.get("#susbscribe_email").type(newUser().email);
    cy.get("#subscribe").click();
    cy.contains("You have been successfully subscribed!").should("be.visible");
  });
});
