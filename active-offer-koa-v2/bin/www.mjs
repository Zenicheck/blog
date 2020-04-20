import http from 'http'

import app from '../app.mjs'

http.createServer(app.callback()).listen(process.env.PORT || 3000)