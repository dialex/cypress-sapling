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

echo "🐳 Building Docker image ($DOCKER_IMAGE_NAME:${PACKAGE_VERSION})"
docker build -t $DOCKER_REGISTRY_URL/$DOCKER_IMAGE_NAME:$PACKAGE_VERSION .
