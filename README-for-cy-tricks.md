# Tips & Tricks for Cypress

This is a collection of simple and recurring scenarios when writing Cypress tests. For more complex recipes, check the [official doc](https://docs.cypress.io/examples/examples/recipes.html).

- Tips &amp; Tricks for Cypress
  - Setup
    - Scenario: abort cypress after first failed test
    - Scenario: read a test file from fixtures
  - Assertions
    - Scenario: assert the text of a page (string or number)
    - Scenario: assert the number of elements selected
    - Scenario: assert the result of two Cypress commands
  - Actions
    - Scenario: upload a file
  - Selectors
    - Scenario: given a list, return row that contains specific text
    - Scenario: selector is flaky due to page redesigns
    - Scenario: type text into input field and press enter
    - Scenario: use selector X to narrow down area, and then use selector Y to find element
  - Waits
    - Scenario: wait until a network (ie. HTTP/XHR) request resolves
    - Scenario: wait until a condition becomes true
  - Mocks
    - Scenario: force a specific response to an HTTP request

## Setup

### Scenario: abort cypress after first failed test

Add this inside your `describe` block:

```js
afterEach(function() {
  if (this.currentTest.state === "failed") {
    Cypress.runner.stop()
  }
})
```

More info on this [GitHub thread](https://github.com/cypress-io/cypress/issues/518).

### Scenario: read a test file from fixtures

You have [three ways](https://github.com/cypress-io/cypress/issues/3963#issuecomment-483581934) to do it:

- `.fixture()` inside an `it`
- `.fixture()` inside a `before` or `beforeEach`
- `require`

## Assertions

### Scenario: assert the text of a page (string or number)

Your page has text, some are words some are numbers. It's not [straightforward](https://github.com/cypress-io/cypress/issues/630) to get the text of a page:

```js
cy.get("selector").invoke("text") // built-in with cypress
cy.get("selector").text() // requires https://github.com/Lakitna/cypress-commands
```

Note that the code above will return a Chainable object, not a string. Meaning you can do `...text().should("be.not.empty")` but you cannot do `expect(...text()).to.be.not.empty()`.

When asserting numbers, it's safer to do:

```js
cy.get("selector")
  .text()
  .then(str => Number(str))
  .should("be.above", 2)
```

### Scenario: assert the number of elements selected

```js
// assert number of elements selected
cy.get("selector")
  .find("child-selector")
  .should("have.length", 4)

// but for comparisons other than equal, you need this syntax
cy.get("selector")
  .find("child-selector")
  .its("length")
  .should("be.gte", 4) // greater than or equal
```

### Scenario: assert the result of two Cypress commands

It is not recommended that you assign return values of Cypress commands (async):

```js
const textBeforeClick = cy.get("#btn").text()
cy.get("#btn").click()
const textAfterClick = cy.get("#btn").text()
expect(textBeforeClick).not.to.eq(textAfterClick)
```

Alternatively, you can use [aliasing](https://docs.cypress.io/api/commands/as.html#Syntax) to do [this](https://github.com/cypress-io/cypress/issues/630#issuecomment-524689538):

```js
cy.get("#btn")
  .text()
  .as("textBeforeClick")
cy.get("#btn").click()
cy.get("#btn")
  .text()
  .should("not.equal", this.textBeforeClick)
```

## Actions

### Scenario: upload a file

```js
Cypress.Commands.add("uploadFile", (selector, fileName, mimeType) =>
  cy.get(selector).then(input =>
    cy
      .fixture(fileName, "base64")
      .then(Cypress.Blob.base64StringToBlob)
      .then(blob => {
        const element = input[0]
        const testFile = new File([blob], fileName, {
          type: mimeType
        })
        const dataTransfer = new DataTransfer()
        dataTransfer.items.add(testFile)
        element.files = dataTransfer.files
        element.dispatchEvent(new Event("change", { bubbles: true }))
      })
  )
)
```

## Selectors

### Scenario: given a list, return row that contains specific text

`cy.contains("text")` is not as eficient or precise as the alternative below.

`cy.contains("selector", "text")` returns all elements that match the selector AND contain the text.

```js
cy.contains("#results li.item", "Lisbon (District)")
```

### Scenario: selector is flaky due to page redesigns

Write a selector that searches by data atribute, instead of id or css path.

```html
<!-- code.html -->
<input data-cy="searchBar" class="..." />
```

```js
// test.spec.js
cy.get("[data-cy='searchBar']")
```

### Scenario: type text into input field and press enter

You can combine JS [template strings](https://stackoverflow.com/a/32202320/675577) with Cypress [Enter](https://docs.cypress.io/api/commands/type.html#Arguments) special key.

```js
const text = "text to input on search"
cy.get("selector").type(`${text}{enter}`)
```

### Scenario: use selector `X` to narrow down area, and then use selector `Y` to find element

Simple selectors tend to match more elements than you want. You might want use your simple selector after narrowing down the search with another selector. Use [`cy.find`](https://docs.cypress.io/api/commands/find.html).

```js
cy.contains("li.todo", "My task") // <-- narrow down
  .should("exist")
  .find('input[type="checkbox"]') // <-- get what you want
  .check()
```

## Waits

Avoid as much as possible doing `cy.wait(milli)`. There are other, more efficient, ways.

### Scenario: wait until a network (ie. HTTP/XHR) request resolves

You need to wait for an HTTP request to finish to continue with your test. You don't start the request, it is made implicitly by the system you're testing. The UI doesn't tell you for sure if the request finished. To be accurate you need to listen at the network level. [(read more)](https://github.com/cypress-io/testing-workshop-cypress/blob/master/slides/05-xhr/PITCHME.md)

```js
cy.server() // starts a listener of network requests
cy.route("GET", "/todos") // tells cypress the endpoint we want to spy
  .as("listAll") // gives it a name/alias

cy.visit("/") // this page implicitly calls the spied endpoint
cy.wait("@listAll") // cy.server spies the endpoint and waits until a reply
```

### Scenario: wait until a condition becomes true

Using the [waitUntil](https://github.com/NoriSte/cypress-wait-until) plugin you can execute/repeat code until a given condition becomes true. This is useful when your code depends on some external background tasks (e.g. cron job).

```js
cy.waitUntil(
  () =>
    cy
      .request(targetSite)
      .its("status")
      .then(status => status === 200),
  {
    interval: 5000, // tries every 5s
    timeout: 30000, // gives up after 30s
    errorMsg: `Timed out pinging ${targetSite}`
  }
)
```

Your condition might throw an exception instead of returning false. For instance, if you need to wait until a page element becomes visible, you could try `cy.get()` but that method has a built-in assertion. That means it would fail and exit the `waitUntil` block, instantly failing the test. [You need an alternative way](https://github.com/NoriSte/cypress-wait-until/issues/75), like a direct jQuery call:

```js
cy.waitUntil(() => {
  // refreshes the page
  cy.reload()
  // returns true, if your element exists in the page
  return Cypress.$(cssSelector).length > 0
})
cy.get(cssSelector).should("exist")
```

## Mocks

When writing E2E tests usually we avoid mocks, since the point is to test "the real deal". If you must...

### Scenario: force a specific response to an HTTP request

`cy.route` can both spy network requests or fake responses to those same requests. You just need to pass the response you want, see [official doc](https://docs.cypress.io/api/commands/route.html#Syntax).

```js
cy.route("GET", "/todos").as("list") // spies the endpoint

const response = "..."
cy.route("GET", "/todos", response).as("list") // mocks a response
```
