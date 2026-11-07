describe('Autenticação - SauceDemo', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('RF-01 - deve autenticar com credenciais válidas', () => {
    cy.get('[data-test="username"]').type('standard_user');
    cy.get('[data-test="password"]').type('secret_sauce');
    cy.get('[data-test="login-button"]').click();

    cy.url().should('include', '/inventory.html');
    cy.get('.title').should('have.text', 'Products');
    cy.get('.inventory_list .inventory_item').should('have.length.greaterThan', 0);
  });

  it('RF-02 - deve apresentar mensagem ao utilizar senha inválida', () => {
    cy.get('[data-test="username"]').type('standard_user');
    cy.get('[data-test="password"]').type('senha_incorreta');
    cy.get('[data-test="login-button"]').click();

    cy.get('[data-test="error"]')
      .should('be.visible')
      .and('contain.text', 'Username and password do not match');
    cy.url().should('not.include', '/inventory.html');
  });
});
