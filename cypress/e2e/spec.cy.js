// enables intelligent code completion for Cypress commands
// https://on.cypress.io/intelligent-code-completion
/// <reference types="cypress" />

beforeEach(() => {
  cy.visit('public/index.html')
})

it('clicks the Next button until we get to the last page', () => {
  // the HTML table on the page is paginated
  // can you click the "Next" button until
  // we get to the very last page?
  // button selector "[value=next]"
  // cy.get('[value=next]') // keep clicking!

  cy.clickUntilDisabled('[value=next]');
  cy.log('**confirm we are on the last page**')
  cy.get('[value=next]').should('be.disabled')
  cy.get('[value=last]').should('be.disabled')
})

Cypress.Commands.add('clickUntilDisabled', (selector) => {
  cy.get(selector).as('element').then($element => {
    if ($element.is(':disabled')) {
      cy.log(selector + ' is disabled!')
      return
    }
    cy.get('@element').click()
    cy.clickUntilDisabled(selector)
  })
});
