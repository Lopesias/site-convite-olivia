#!/bin/bash
set -e
npm install --legacy-peer-deps
npm run build
mkdir -p docs
cp -R dist/site-convite-olivia/browser/. docs/
