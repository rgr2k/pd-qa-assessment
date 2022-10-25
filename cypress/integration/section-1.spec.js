/// <reference types="Cypress" />
import Data from '../fixtures/data.json';
import Obj from '../objects/object.js';

const obj = new Obj();

describe('Contact Bubble Validation', () => {

   beforeEach(() => {
     
      cy.visit('/');
      cy.contains(Data.literals.MAIN_QUOTE);
    })

    it('Assert url - Smoke', () => {

        cy.url().should('eq', Cypress.config().baseUrl);
    });
    
    it('Assert that the Contact Bubble exists is visible and clickable - Smoke', () => {

        cy.ck_PodiumBubble();
    });

    it('Assert that the Bubble is closed', () => {

        cy.get(Data.elements.podiumBubble).should('exist');
            obj.closeTheBubble();
        cy .get(Data.elements.podiumWebWidget).should('not.exist');
    });

    it('Assert the toggle for the modal open and close', () => {

        obj.toggle();
        cy.getIframeBody(Data.elements.podiumBubble).find(Data.elements.button).invoke('attr', 'aria-label').should('include', 'close');
        obj.toggle();
        cy.getIframeBody(Data.elements.podiumBubble).find(Data.elements.button).invoke('attr', 'aria-label').should('include', 'open');
      });
    
      it('Assert toggle for the modal open and click outside of the modal to close', () => {
        
        obj.toggle();
        cy.get(Data.elements.podiumModal).should('exist');
        cy.getIframeBody(Data.elements.podiumModal).click(0, 0);
        cy.get(Data.elements.podiumModal).should('not.exist');
      });

      it('Assert that it completes the core user flow of the website widget', () => {
        // Open iframe
        obj.toggle();
        cy.getIframeBody(Data.elements.podiumModal).find(Data.elements.locationSelector).should('be.visible');
        // Click 'Scoreboard Sports - Orem'
        obj.clickOnOrem();
        // Input Name, Mobile Phone, and Message, and submit form
        obj.submitTheForm(Data.literals.TEST_NAME, Data.literals.TEST_MOBILE, 'This is a test.');
        // Check for confirmation
        cy.getIframeBody(Data.elements.podiumModal).find(Data.elements.smsMain).within(($form) => {
          cy.get(Data.elements.smsFormContent).should('not.exist');
          cy.get(Data.elements.submitMessage).should('exist').and('be.visible');
          cy.get(Data.elements.submitMessageStatus).should('have.text', Data.literals.SENDING).and('be.visible');
          cy.get(Data.elements.submitMessageStatus).should('have.text', 'Received').and('be.visible');
          cy.get(Data.elements.confirmMessage).should('be.visible');
        });
      });
    
      it('Assert that it navigates to the Podium Acceptable Use Policy', () => {

        obj.toggle();
        cy.getIframeBody(Data.elements.podiumModal).find('.LocationSelector__PodiumPower').within(() => {
          // target="_blank" will open link in a new tab
          cy.contains('a', 'use is subject to terms').then(($link) => {
            expect($link).to.have.attr('href', Data.literals.PODIUM_POLICY);
            cy.request($link.prop('href')).its('status').should('eq', 200);
          })
        });
      });
    
      it('Assert that it returns the errors within the form when inputs are empty', () => {

        const errors = [
          { index: 0, text: Data.literals.NAME_REQUIRED },
          { index: 1, text: Data.literals.MOBILE_REQUIRED },
          { index: 2, text: Data.literals.MESSAGE_REQUIRED }
        ];

        obj.toggle();
        obj.clickOnOrem();
        cy.getIframeBody(Data.elements.podiumModal).find(Data.elements.smsMain).within(($form) => {
          cy.wrap($form).submit();
          errors.forEach((error) => {
            cy.get(Data.elements.textInputError).eq(error.index).should('have.text', error.text);
          });
        });
      });
    
      it('Assert that it returns an error when Mobile Phone* is too short', () => {

        obj.toggle();
        obj.clickOnOrem();
        obj.submitTheForm(Data.literals.TEST_NAME, '501', 'This is a test.');
        cy.getIframeBody(Data.elements.podiumModal).find(Data.elements.smsMain).within(() => {
          cy.get(Data.elements.textInputError).should('have.text', Data.literals.MOBILE_SHORT_VAL);
        });
      });
    
      it('Assert that it returns an error when Mobile Phone* is invalid', () => {

        obj.toggle();
        obj.clickOnOrem();
        obj.submitTheForm(Data.literals.TEST_NAME, Data.literals.TEST_MOBILE_ZERO, 'This is a test.');
        // Check for errors
        cy.getIframeBody(Data.elements.podiumModal).find(Data.elements.smsMain).within(() => {
          cy.get(Data.elements.smsFormContent).should('not.exist');
          cy.get(Data.elements.submitMessage).should('exist').and('be.visible');
          cy.get(Data.elements.submitMessageStatus).should('have.text', Data.literals.SENDING).and('be.visible');
          cy.get(Data.elements.confirmMessage).should('not.exist');
          cy.get(Data.elements.legalError).should('have.text', Data.literals.PHONE_NUMBER_REQ);
          cy.get(Data.elements.buttonSubmit).should('have.text', Data.literals.TRY_AGAIN);
        });
      });
})