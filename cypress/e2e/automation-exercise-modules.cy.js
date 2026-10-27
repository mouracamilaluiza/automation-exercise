import { shop } from '../pages/shop';
import { newUser, createUser, removeUser } from '../support/user';

describe('Automation Exercise — casos do TCC', () => {
  let user;
  let accountMayExist;

  beforeEach(() => {
    user = newUser();
    accountMayExist = false;
  });

  afterEach(() => {
    if (accountMayExist) removeUser(user);
  });

  function existingAccount() {
    accountMayExist = true;
    createUser(user);
  }

  it('TC01 — cadastrar usuário e excluir conta', () => {
    shop.home();
    shop.auth();
    accountMayExist = true;
    shop.register(user);
    shop.deleteAccount();
  });

  it('TC02 — autenticar com credenciais válidas', () => {
    existingAccount();
    shop.home();
    shop.auth();
    shop.login(user);
    shop.loggedIn(user);
    shop.deleteAccount();
  });

  it('TC03 — rejeitar credenciais inválidas', () => {
    shop.home();
    shop.auth();
    shop.login(user);
    cy.contains('.login-form p', 'Your email or password is incorrect!').should('be.visible');
    cy.get('header a[href="/logout"]').should('not.exist');
  });

  it('TC04 — encerrar sessão', () => {
    existingAccount();
    shop.home();
    shop.auth();
    shop.login(user);
    shop.loggedIn(user);
    cy.get('header a[href="/logout"]').click();
    cy.location('pathname').should('eq', '/login');
    cy.contains('h2', 'Login to your account').should('be.visible');
    cy.get('header a[href="/logout"]').should('not.exist');
  });

  it('TC05 — rejeitar cadastro com e-mail existente', () => {
    existingAccount();
    shop.home();
    shop.auth();
    shop.signup(user);
    cy.contains('.signup-form p', 'Email Address already exist!').should('be.visible');
  });

  it('TC08 — listar produtos e verificar detalhes do primeiro', () => {
    shop.home();
    shop.products();
    cy.get('.features_items .productinfo p').first().invoke('text').as('firstProduct', { type: 'static' });
    cy.get('.features_items a[href^="/product_details/"]').first().click();
    cy.location('pathname').should('match', /^\/product_details\/\d+$/);
    cy.get('@firstProduct').then((name) => cy.get('.product-information h2').should('have.text', name));
    cy.get('.product-information').within(() => {
      cy.contains('p', /Category:\s*\S+/).should('be.visible');
      cy.contains('span', /Rs\.\s*\d+/).should('be.visible');
      ['Availability', 'Condition', 'Brand'].forEach((label) => {
        cy.contains('p', new RegExp(`${label}:\\s*\\S+`)).should('be.visible');
      });
    });
  });

  it('TC09 — pesquisar produto e validar todos os resultados', () => {
    shop.home();
    shop.products();
    const term = 'Blue Top';
    cy.get('#search_product').type(term);
    cy.get('#submit_search').click();
    cy.contains('h2', 'Searched Products').should('be.visible');
    cy.get('.features_items .productinfo p').should('have.length.greaterThan', 0)
      .each(($name) => {
        expect($name.text().toLowerCase()).to.include(term.toLowerCase());
        cy.wrap($name).should('be.visible');
      });
  });

  it('TC10 — assinar novidades pelo rodapé da home', () => {
    shop.home();
    cy.get('#footer').scrollIntoView();
    cy.contains('#footer h2', 'Subscription').should('be.visible');
    cy.get('#susbscribe_email').type(user.email);
    cy.get('#subscribe').click();
    cy.contains('You have been successfully subscribed!').should('be.visible');
  });

  it('TC15 — cadastrar antes do checkout e concluir pedido', () => {
    shop.home();
    shop.auth();
    accountMayExist = true;
    shop.register(user);
    shop.addFirstProduct();
    shop.checkout(user);
    shop.deleteAccount();
  });

  it('TC16 — autenticar antes do checkout e concluir pedido', () => {
    existingAccount();
    shop.home();
    shop.auth();
    shop.login(user);
    shop.loggedIn(user);
    shop.addFirstProduct();
    shop.checkout(user);
    shop.deleteAccount();
  });
});
