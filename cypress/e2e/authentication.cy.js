import { shop } from "../pages/shop";
import { useAccountLifecycle } from "../support/account";
import { reportTest } from "../support/reporting";

describe("Autenticação e cadastro", () => {
  const account = useAccountLifecycle();

  it("TC01 — cadastrar usuário e excluir conta", () => {
    reportTest("TC01", "Autenticação", "critical");
    const user = account.user();
    shop.home();
    shop.auth();
    account.markAccountCreated();
    shop.register(user);
    shop.deleteAccount();
  });

  it("TC02 — autenticar com credenciais válidas", () => {
    reportTest("TC02", "Autenticação", "critical");
    const user = account.user();
    account.createExistingAccount();
    shop.home();
    shop.auth();
    shop.login(user);
    shop.loggedIn(user);
    shop.deleteAccount();
  });

  it("TC03 — rejeitar credenciais inválidas", () => {
    reportTest("TC03", "Autenticação", "normal");
    const user = account.user();
    shop.home();
    shop.auth();
    shop.login(user);
    cy.contains(".login-form p", "Your email or password is incorrect!").should(
      "be.visible",
    );
    cy.get('header a[href="/logout"]').should("not.exist");
  });

  it("TC04 — encerrar sessão", () => {
    reportTest("TC04", "Autenticação", "critical");
    const user = account.user();
    account.createExistingAccount();
    shop.home();
    shop.auth();
    shop.login(user);
    shop.loggedIn(user);
    cy.get('header a[href="/logout"]').click();
    cy.location("pathname").should("eq", "/login");
    cy.contains("h2", "Login to your account").should("be.visible");
    cy.get('header a[href="/logout"]').should("not.exist");
  });

  it("TC05 — rejeitar cadastro com e-mail existente", () => {
    reportTest("TC05", "Cadastro", "normal");
    const user = account.user();
    account.createExistingAccount();
    shop.home();
    shop.auth();
    shop.signup(user);
    cy.contains(".signup-form p", "Email Address already exist!").should(
      "be.visible",
    );
  });
});
