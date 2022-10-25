import Data from '../fixtures/data.json';

export default class Page {

  constructor() {}

  clickOnOrem() {
    cy.getIframeBody(Data.elements.podiumModal).find(Data.elements.locationsList).within(() => {
      cy.get(Data.elements.button).first().click();
    });
  }

  toggle() {
    return cy
      .getIframeBody(Data.elements.podiumBubble)
      .find(Data.elements.button)
      .click()
  }

  fillInTheForm(name, mobilePhone, message) {
    cy.get(Data.elements.name).clear().type(name);
    cy.get(Data.elements.inputTel).clear().type(mobilePhone);
    cy.get(Data.elements.message).clear().type(message);
  }

  submitTheForm(name, mobilePhone, message) {
    cy.getIframeBody(Data.elements.podiumModal).find(Data.elements.smsMain).within(($form) => {
      cy.get(Data.elements.smsText).should('exist').and('not.be.visible');
      this.fillInTheForm(name, mobilePhone, message)
      cy.wrap($form).submit();
    });
  }

  closeTheBubble() {
    cy.getIframeBody(Data.elements.podiumBubble).find(Data.elements.button).should('have.id', 'podium-website-widget-button').click();
  }
  
}