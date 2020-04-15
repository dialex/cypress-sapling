# 🌱 Cypress Sapling 🌱

![logo](./doc/logo.jpg)

_No need to start with the seed -- plant the sapling!_

### ~~Batteries~~ Fertilizer included ™️

- Code linting, via [ESLint](https://github.com/eslint/eslint)
- Code formatting, via [Prettier](https://github.com/prettier/prettier)
- Conventional commits, via [git-cz](https://github.com/streamich/git-cz)
- HTML test results, via [mochawesome](https://github.com/adamgruber/mochawesome)
- JUnit test results (for CI integration), via [mocha-junit-reporter](https://github.com/michaelleeallen/mocha-junit-reporter)
- Intuitive test commands, via [Testing Library](https://github.com/testing-library/cypress-testing-library)
- Filter tests to run based on tags, via [cypress-select-tests](https://github.com/bahmutov/cypress-select-tests)
- Auto retry failed tests, via [cypress-plugin-retries](https://github.com/Bkucera/cypress-plugin-retries)
- Wait the test execution until a condition is true, via [cypress-wait-until](https://github.com/NoriSte/cypress-wait-until)
- Docker commands to build an image ready to run tests anywhere

### Tasks

For a complete list of tasks, have a look at `package.json`. We highlight the following:

```sh
yarn deps:install   # installs dependencies, using the versions specified on yarn.lock
yarn secrets:setup  # creates an unversioned file with secret env vars
yarn c              # performs a conventional commit, using an interactive dialog
yarn cypress        # runs tests with Cypress via command line
yarn cypress:debug  # runs tests with Cypress via User Interface
yarn docker:build   # builds a Docker image containing Cypress + dependencies + tests
yarn format:fix     # fixes the indentation of your code
yarn lint:fix       # fixes the linting of your code
yarn test           # runs tests (cli) and displays the results in a report
```

### Useful resources

- [Cypress workshop](https://github.com/cypress-io/testing-workshop-cypress#content-): a workshop complete with application, exercise tests and speaker slides
