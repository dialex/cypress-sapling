#!/usr/bin/env bash

read -p "Check your package.json... did Cypress' version increase? [y/N] " choice
case "$choice" in
y | Y | [yY][eE][sS])
  echo "⏫ Cypress was upgraded -> Bumping major version"
  yarn bump:major
  ;;
n | N | [nN][oO] | *)
  echo "🔼 Only dependencies were upgraded -> Bumping minor version"
  yarn bump:minor
  ;;
esac
