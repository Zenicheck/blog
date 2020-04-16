#!/bin/sh

PORT=8900 npx nodemon --experimental-modules --experimental-json-modules bin/www.mjs --watch routes --watch views --watch helpers --watch app.mjs
