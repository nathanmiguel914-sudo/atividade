describe('Checkout - SauceDemo', () => {
  const login = () => {
    cy.visit('/');
    cy.get('[data-test="username"]').type('standard_user');
    cy.get('[data-test="password"]').type('secret_sauce');
    cy.get('[data-test="login-button"]').click();
  };

  it('RF-07 - deve validar o preenchimento dos dados obrigatórios do checkout', () => {
    login();
    cy.get('.inventory_item').first().find('button').click();
    cy.get('.shopping_cart_link').click();
    cy.get('[data-test="checkout"]').click();

    cy.get('.title').should('have.text', 'Checkout: Your Information');
    cy.get('[data-test="continue"]').click();

    cy.get('[data-test="error"]')
      .should('be.visible')
      .and('contain.text', 'First Name is required');
  });

  it('RF-07 e RF-08 - deve concluir a jornada completa de compra (E2E)', () => {
    login();

    // Listagem e seleção do produto
    cy.get('.title').should('have.text', 'Products');
    cy.get('.inventory_item').first().within(() => {
      cy.get('.inventory_item_name').invoke('text').as('produtoEscolhido');
      cy.get('.inventory_item_price').invoke('text').as('precoEscolhido');
      cy.get('button').click();
    });
    cy.get('.shopping_cart_badge').should('have.text', '1');

    // Carrinho e conferência do produto
    cy.get('.shopping_cart_link').click();
    cy.get('.title').should('have.text', 'Your Cart');
    cy.get('.cart_item').should('have.length', 1);
    cy.get('@produtoEscolhido').then((nome) => {
      cy.get('.inventory_item_name').should('have.text', nome);
    });
    cy.get('@precoEscolhido').then((preco) => {
      cy.get('.inventory_item_price').should('have.text', preco);
    });

    // Dados do comprador
    cy.get('[data-test="checkout"]').click();
    cy.get('.title').should('have.text', 'Checkout: Your Information');
    cy.get('[data-test="firstName"]').type('Aluno');
    cy.get('[data-test="lastName"]').type('Teste');
    cy.get('[data-test="postalCode"]').type('50000000');
    cy.get('[data-test="continue"]').click();

    // Revisão do pedido
    cy.get('.title').should('have.text', 'Checkout: Overview');
    cy.get('.cart_item').should('have.length', 1);
    cy.get('.summary_subtotal_label').should('be.visible').and('contain.text', 'Item total');
    cy.get('.summary_total_label').should('be.visible').and('contain.text', 'Total');

    // Finalização e confirmação
    cy.get('[data-test="finish"]').click();
    cy.get('.title').should('have.text', 'Checkout: Complete!');
    cy.get('.complete-header')
      .should('be.visible')
      .and('have.text', 'Thank you for your order!');
    cy.get('.complete-text').should('be.visible').and('not.be.empty');
  });
});
