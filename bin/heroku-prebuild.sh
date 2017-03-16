#!/usr/bin/env bash

set -xe

NPM_CONFIG_PRODUCTION=false

yarn

npm run build

rm -rf node_modules

NPM_CONFIG_PRODUCTION=true

yarn
