describe('Listagem de produtos - SauceDemo', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('[data-test="username"]').type('standard_user');
    cy.get('[data-test="password"]').type('secret_sauce');
    cy.get('[data-test="login-button"]').click();
  });

  it('RF-03 - deve exibir a listagem de produtos após o login', () => {
    cy.get('.title').should('have.text', 'Products');
    cy.get('.inventory_list').should('be.visible');
    cy.get('.inventory_item').should('have.length.greaterThan', 0);
    cy.get('.inventory_item_name').first().should('be.visible').and('not.be.empty');
    cy.get('.inventory_item_price').first().should('be.visible').and('contain.text', '$');
  });
});
