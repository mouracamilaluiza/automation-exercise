import { shop } from "../pages/shop";
import { reportTest } from "../support/reporting";

describe("Produtos", () => {
  it("TC08 — listar produtos e verificar detalhes do primeiro", () => {
    reportTest("TC08", "Produtos", "critical");
    shop.home();
    shop.products();
    cy.get(".features_items .productinfo p")
      .first()
      .invoke("text")
      .as("firstProduct", { type: "static" });
    cy.get('.features_items a[href^="/product_details/"]').first().click();
    cy.location("pathname").should("match", /^\/product_details\/\d+$/);
    cy.get("@firstProduct").then((name) =>
      cy.get(".product-information h2").should("have.text", name),
    );
    cy.get(".product-information").within(() => {
      cy.contains("p", /Category:\s*\S+/).should("be.visible");
      cy.contains("span", /Rs\.\s*\d+/).should("be.visible");
      ["Availability", "Condition", "Brand"].forEach((label) => {
        cy.contains("p", new RegExp(`${label}:\\s*\\S+`)).should("be.visible");
      });
    });
  });

  it("TC09 — pesquisar produto e validar os resultados", () => {
    reportTest("TC09", "Produtos", "critical");
    shop.home();
    shop.products();
    cy.request("/api/productsList").then(({ body }) => {
      const response = typeof body === "string" ? JSON.parse(body) : body;
      const term = response.products[0].name;
      cy.get("#search_product").type(term);
      cy.get("#submit_search").click();
      cy.contains("h2", "Searched Products").should("be.visible");
      cy.get(".features_items .productinfo p")
        .should("have.length.greaterThan", 0)
        .each(($name) => {
          expect($name.text().toLowerCase()).to.include(term.toLowerCase());
          cy.wrap($name).should("be.visible");
        });
    });
  });
});
