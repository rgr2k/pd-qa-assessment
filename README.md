## Description

This repository contains an executable automated test suite covering core user flows for https://demo.podium.tools/qa-webchat-lorw/, 
using [Cypress](https://www.cypress.io/) and JavaScript.

## Installation

1. Clone [podium](https://github.com/rgr2k/pd-qa-assessment)
2. Run `npm install`

## Usage

### Run Headed

On your terminal prompt, run one of the below commands

1. Run `npm run cypress:open`
2. Click `section-1.spec.js`

or

1. Run `npm run cy:head`

### Run Headlesssly

On your terminal prompt, run one of the below commands

1. Electron `npm run cy:run`
2. Chrome `npm run cy:chrome`
3. Firefox `npm run cy:firefox`
4. Docker `npm run cy:docker`

## Known Bugs

- The search bar returns the same locations regardless of the postal code or address inputted.
- The iframe prompt doesn't display consistently.
- Remove the space in `#Mobile Phone`.
- The iframe Send button isn't actually disabled.
- The API returns more than 3 Locations but the UI displays only 3