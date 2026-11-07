# Atividade — Automação de Testes UI e E2E com Cypress

## 1. Sobre o projeto

Projeto de automação de testes da aplicação de demonstração [SauceDemo](https://www.saucedemo.com/), desenvolvido com Cypress. O objetivo é verificar os principais fluxos de autenticação, listagem de produtos, carrinho e finalização de compra.

**Este projeto não é uma API e não implementa um sistema próprio.** O Cypress controla o navegador e testa a interface web já disponibilizada pelo SauceDemo. É necessária conexão com a internet para acessar o site.

## 2. Tecnologias

- Node.js e npm
- Cypress
- JavaScript
- SauceDemo

## 3. Pré-requisitos

1. Instale o Node.js (versão LTS recomendada): https://nodejs.org/
2. Tenha conexão com a internet.
3. Extraia o arquivo ZIP em uma pasta do computador.

## 4. Instalação

Abra a pasta do projeto no VS Code. No terminal integrado, execute:

```bash
npm install
```

Esse comando instala as dependências definidas em `package.json`, incluindo o Cypress.

## 5. Como executar

### Abrir o Cypress (modo visual)

```bash
npm run cy:open
```

Na janela do Cypress:
1. Selecione **E2E Testing**.
2. Escolha um navegador disponível.
3. Clique em **Start E2E Testing**.
4. Selecione os arquivos `.cy.js` para executar os testes.

### Executar todos os testes pelo terminal

```bash
npm run cy:run
```

A execução em modo headless não exige interação manual. O Cypress registra vídeos da execução e capturas de tela em caso de falha, conforme a configuração.

## 6. Organização dos testes

| Arquivo | Cobertura |
|---|---|
| `autenticacao.cy.js` | RF-01: login válido; RF-02: senha inválida |
| `produtos.cy.js` | RF-03: apresentação da listagem |
| `carrinho.cy.js` | RF-04: adicionar produto e conferir contador; RF-05: remover produto; RF-06: conferir nome, preço e quantidade |
| `checkout.cy.js` | RF-07: validação de campos obrigatórios; RF-07/RF-08: jornada E2E até a confirmação |

## 7. Massa de teste

Para os cenários automatizados foi utilizado o usuário público de demonstração do SauceDemo:

- Usuário: `standard_user`
- Senha: `secret_sauce`

No cenário negativo, é utilizada uma senha incorreta para verificar a mensagem de erro.

Os dados preenchidos no checkout são fictícios e usados somente para a demonstração.

## 8. Assertions e seletores

Os testes utilizam seletores `data-test` quando disponíveis e seletores CSS da interface, além de assertions do Cypress (`should`) para verificar, por exemplo:

- URL após autenticação;
- mensagem de erro no login;
- título e quantidade de produtos;
- contador do carrinho;
- nome, preço e quantidade do item;
- mensagens e telas do checkout;
- confirmação final do pedido.

## 9. Evidências

Após executar `npm run cy:run`, consulte:

- `cypress/videos/`: vídeos das especificações executadas;
- `cypress/screenshots/`: capturas de tela geradas automaticamente quando ocorrer falha.

Para evidências de sucesso, execute pelo Cypress em modo visual e capture a tela dos resultados com todos os testes aprovados. Guarde essas imagens em uma pasta `evidencias/` antes de entregar.

## 10. Entrega

Entregue a pasta do projeto compactada em `.zip` ou publique-a em um repositório GitHub. Não inclua a pasta `node_modules`, pois ela pode ser recriada com `npm install`.

## 11. Observações

- Os testes são independentes: cada cenário realiza seu próprio login quando necessário.
- O teste E2E percorre autenticação, produtos, carrinho, dados do comprador, revisão e confirmação.
- A aplicação SauceDemo é externa. Mudanças no site, indisponibilidade ou bloqueios de rede podem afetar a execução.
