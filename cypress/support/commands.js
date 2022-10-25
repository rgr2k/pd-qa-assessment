
import Data from '../fixtures/data.json';
import 'cypress-iframe'

Cypress.Commands.add('ck_PodiumBubble', () => {
    cy.get(Data.elements.podiumBubble)
        .should('be.visible')
    cy.get(Data.elements.podiumPrompt)
        .should('exist')
    cy.get(Data.elements.podiumBubble)
        .realClick()
})

Cypress.Commands.add('getIframeBody', (selector) => {
    return cy
        .get(selector)
        .its('0.contentDocument.body').should('not.be.empty')
        .then(cy.wrap)
  })