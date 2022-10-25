
import './commands'
import 'cypress-plugin-tab'
import 'cypress-real-events'
import 'cypress-grep'

Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
  });