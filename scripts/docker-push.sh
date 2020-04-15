#!/usr/bin/env bash

# TODO: CONFIGURE THIS
DOCKER_REGISTRY_URL=DOCKER_REGISTRY_URL_MISSING
DOCKER_IMAGE_NAME=cypressonic

# Extract version from package.json
if ! command -v jq >/dev/null; then
  echo >&2 "Error: 'jq' command not found"
  echo >&2 "See how to install for your system in https://stedolan.github.io/jq/download/"
  exit 1
fi
PACKAGE_VERSION=$(jq --raw-output '.version' <package.json)

echo "🐳 Pushing Docker image to registry ($DOCKER_IMAGE_NAME:${PACKAGE_VERSION})"
docker push $DOCKER_REGISTRY_URL/$DOCKER_IMAGE_NAME:$PACKAGE_VERSION

echo "✅ Committing changes to git"
git add package.json yarn.lock
git commit -m "docker: 🐳 upgrade Cypress and dependencies"

echo "🏷  Tagging new version on git (marks commit used to build Docker image)"
git tag v${PACKAGE_VERSION}
