#!/usr/bin/env bash

NPM_CONFIG_PRODUCTION=false

npm install

npm run build

rm -rf node_modules

NPM_CONFIG_PRODUCTION=true

npm install
