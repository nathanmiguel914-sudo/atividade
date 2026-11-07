describe('Carrinho de compras - SauceDemo', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('[data-test="username"]').type('standard_user');
    cy.get('[data-test="password"]').type('secret_sauce');
    cy.get('[data-test="login-button"]').click();
  });

  it('RF-04 - deve adicionar produto e atualizar o contador do carrinho', () => {
    cy.get('.inventory_item').first().within(() => {
      cy.get('.inventory_item_name').invoke('text').as('nomeProduto');
      cy.get('.inventory_item_price').invoke('text').as('precoProduto');
      cy.get('button').click();
    });

    cy.get('.shopping_cart_badge').should('be.visible').and('have.text', '1');
    cy.get('.shopping_cart_link').click();

    cy.get('.cart_item').should('have.length', 1);
    cy.get('@nomeProduto').then((nome) => {
      cy.get('.inventory_item_name').should('have.text', nome);
    });
    cy.get('@precoProduto').then((preco) => {
      cy.get('.inventory_item_price').should('have.text', preco);
    });
  });

  it('RF-05 - deve remover produto do carrinho', () => {
    cy.get('.inventory_item').first().find('button').click();
    cy.get('.shopping_cart_badge').should('have.text', '1');
    cy.get('.shopping_cart_link').click();

    cy.get('.cart_item').should('have.length', 1);
    cy.get('button[data-test^="remove"]').click();
    cy.get('.cart_item').should('not.exist');
    cy.get('.shopping_cart_badge').should('not.exist');
  });

  it('RF-06 - deve manter nome, preço e quantidade consistentes no carrinho', () => {
    cy.get('.inventory_item').first().within(() => {
      cy.get('.inventory_item_name').invoke('text').as('nome');
      cy.get('.inventory_item_price').invoke('text').as('preco');
      cy.get('button').click();
    });

    cy.get('.shopping_cart_link').click();
    cy.get('.cart_item').should('have.length', 1);
    cy.get('.cart_quantity').should('have.text', '1');

    cy.get('@nome').then((nome) => {
      cy.get('.inventory_item_name').should('have.text', nome);
    });
    cy.get('@preco').then((preco) => {
      cy.get('.inventory_item_price').should('have.text', preco);
    });
  });
});
