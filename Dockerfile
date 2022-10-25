FROM cypress/included:9.7.0

WORKDIR /app

COPY ./cypress ./cypress
COPY ./cypress.json ./cypress.json

RUN npx cypress run