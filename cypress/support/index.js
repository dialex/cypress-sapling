// ***********************************************************
// This file is processed automatically before your test files,
// so it's a great place to put global config and behavior that
// modifies Cypress.
//
// https://on.cypress.io/configuration
// ***********************************************************

import "./commands"

require("cypress-commands")

// Pass anything here you'd normally pass to cy.server()
Cypress.Server.defaults({
  //whitelist: (xhr) => true    // Mutes XHR requests
})
