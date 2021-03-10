// EXAMPLE

describe("API name", function () {
  context("/endpoint", function () {
    it("expects a certain behaviour", function () {
      cy.request("https://www.google.com/").its("status").should("equal", 200)
    })
  })
})
