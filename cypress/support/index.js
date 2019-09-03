// ***********************************************************
// This file is processed automatically before your test files,
// so it's a great place to put global config and behavior that
// modifies Cypress.
//
// https://on.cypress.io/configuration
// ***********************************************************

import "./commands"

require("cypress-commands")
const addContext = require("mochawesome/addContext")

// Pass anything here you'd normally pass to cy.server()
Cypress.Server.defaults({
  //whitelist: (xhr) => true    // Mutes XHR requests
})

// These cookies will not be cleared before each test runs
Cypress.Cookies.defaults({
  whitelist: ["cookie-name"]
})

// In case you want to disable all screenshots (useful for API testing)
Cypress.Screenshot.defaults({
  screenshotOnRunFailure: true
})

Cypress.on("test:after:run", (test, runnable) => {
  if (test.state === "failed") {
    const screenshotFileName = `${runnable.parent.title} -- ${test.title} (failed).png`
    addContext({ test }, `assets/${Cypress.spec.name}/${screenshotFileName}`)
  }
})
