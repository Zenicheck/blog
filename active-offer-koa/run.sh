#!/bin/sh

PORT=8900 npx nodemon bin/www --watch routes --watch views --watch helpers --watch app.js
