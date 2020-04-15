FROM cypress/browsers:node13.6.0-chrome80-ff72

RUN useradd -ms /bin/bash cypress

RUN install -d -m 0755 -o cypress -g cypress /app
RUN chown cypress:cypress /app
WORKDIR /app

ENV CYPRESS_CACHE_FOLDER "/app/.cypress"
# reduce Cypress logging https://github.com/cypress-io/cypress/issues/1243
ENV CI=true

USER cypress

# install dependencies
COPY package.json yarn.lock ./
RUN yarn deps:install

# confirm that Cypress was installed correctly
RUN npx cypress verify

# copy files required by yarn tasks
COPY .eslintrc .prettierrc.yaml cypress.json ./
# copy reporter config, used to output JUnit XML
COPY reporter.config.json ./
# copy tests
COPY cypress cypress
