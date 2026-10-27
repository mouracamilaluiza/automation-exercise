import { payment } from "../support/testData";

const field = (name) => cy.get(`[data-qa="${name}"]`);

export const shop = {
  home() {
    cy.visit("/");
    cy.get("#slider").should("be.visible");
    cy.get('header a[href="/"]').should("be.visible");
  },
  auth() {
    cy.get('header a[href="/login"]').click();
    cy.contains(".login-form h2", "Login to your account").should("be.visible");
    cy.contains(".signup-form h2", "New User Signup!").should("be.visible");
  },
  signup(user) {
    field("signup-name").type(user.name);
    field("signup-email").type(user.email);
    field("signup-button").click();
  },
  register(user) {
    this.signup(user);
    cy.contains("b", "Enter Account Information").should("be.visible");
    cy.get("#id_gender1").check();
    field("name").should("have.value", user.name);
    field("email").should("have.value", user.email);
    field("password").type(user.password, { log: false });
    field("days").select(user.birth_date);
    field("months").select(user.birth_month);
    field("years").select(user.birth_year);
    cy.get("#newsletter").check();
    cy.get("#optin").check();
    const fields = {
      first_name: "firstname",
      last_name: "lastname",
      company: "company",
      address: "address1",
      address2: "address2",
      state: "state",
      city: "city",
      zipcode: "zipcode",
      mobile_number: "mobile_number",
    };
    Object.entries(fields).forEach(([selector, key]) =>
      field(selector).type(user[key]),
    );
    field("country").select(user.country);
    field("create-account").click();
    field("account-created")
      .should("be.visible")
      .and("contain.text", "Account Created!");
    field("continue-button").click();
    this.loggedIn(user);
  },
  login(user) {
    field("login-email").type(user.email);
    field("login-password").type(user.password, { log: false });
    field("login-button").click();
  },
  loggedIn(user) {
    cy.contains("header a", `Logged in as ${user.name}`).should("be.visible");
  },
  deleteAccount() {
    cy.get('header a[href="/delete_account"]').click();
    field("account-deleted")
      .should("be.visible")
      .and("contain.text", "Account Deleted!");
    field("continue-button").click();
  },
  products() {
    cy.get('header a[href="/products"]').click();
    cy.location("pathname").should("eq", "/products");
    cy.contains("h2", "All Products").should("be.visible");
    cy.get(".features_items .product-image-wrapper").should(
      "have.length.greaterThan",
      0,
    );
  },
  addFirstProduct() {
    cy.get(".features_items .productinfo")
      .first()
      .within(() => {
        cy.get("p").invoke("text").as("productName", { type: "static" });
        cy.get("h2").invoke("text").as("productPrice", { type: "static" });
        cy.contains("a", "Add to cart").click();
      });
    cy.get("#cartModal").should("be.visible");
    cy.contains("#cartModal button", "Continue Shopping").click();
    cy.get('header a[href="/view_cart"]').click();
    cy.location("pathname").should("eq", "/view_cart");
    cy.get("#cart_info_table tbody tr").should("have.length", 1);
  },
  checkout(user) {
    cy.contains("a", "Proceed To Checkout").click();
    cy.location("pathname").should("eq", "/checkout");
    cy.contains("h2", "Address Details").should("be.visible");
    ["#address_delivery", "#address_invoice"].forEach((selector) => {
      cy.get(selector)
        .should("contain.text", `${user.firstname} ${user.lastname}`)
        .and("contain.text", user.address1)
        .and("contain.text", user.address2)
        .and("contain.text", user.company)
        .and("contain.text", user.city)
        .and("contain.text", user.state)
        .and("contain.text", user.zipcode)
        .and("contain.text", user.country)
        .and("contain.text", user.mobile_number);
    });
    cy.contains("h2", "Review Your Order").should("be.visible");
    cy.get("@productName").then((name) =>
      cy.get(".cart_description").should("contain.text", name),
    );
    cy.get("@productPrice").then((price) => {
      cy.get(".cart_price").should("contain.text", price);
      cy.get("tbody tr")
        .first()
        .find(".cart_total_price")
        .should("have.text", price);
    });
    cy.get(".cart_quantity").should("contain.text", "1");
    cy.get('textarea[name="message"]').type(
      "Pedido fictício para o trabalho de automação.",
    );
    cy.contains("a", "Place Order").click();
    field("name-on-card").type(user.name);
    field("card-number").type(payment.cardNumber, { log: false });
    field("cvc").type(payment.cvc, { log: false });
    field("expiry-month").type(payment.expiryMonth);
    field("expiry-year").type(payment.expiryYear);
    field("pay-button").click();
    cy.location("pathname").should("include", "/payment_done/");
    field("order-placed")
      .should("be.visible")
      .and("contain.text", "Order Placed!");
    cy.contains("Congratulations! Your order has been confirmed!").should(
      "be.visible",
    );
  },
};
