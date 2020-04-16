import path from 'path'
import Koa from 'koa'
import ejs from 'koa-ejs'
import logger from 'koa-logger'
import _static from 'koa-static'
import admin from 'firebase-admin'
import dotenv from 'dotenv'

import indexRouter from './routes/index.mjs'
import admRouter from './routes/adm.mjs'

const __dirname = path.resolve()

const config = dotenv.config()

import serviceAccount from './offer-firebase.json'

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: config.FIREBASE_HOST
})

const db = admin.firestore()

const app = new Koa()

app.context.db = db
app.context.config = config
app.context.title = 'Gestion de vos offres commerciales'

ejs(app, {
    root: path.join(__dirname, 'views'),
    layout: 'template',
    viewExt: 'html.ejs',
    cache: false, //TODO turn on for production
    debug: true, //TODO turn off for profuction
})

app.use(logger())

app.use(_static(path.join(__dirname, 'public')))

app.use(indexRouter.routes())
app.use(indexRouter.allowedMethods())

app.use(admRouter.routes())
app.use(admRouter.allowedMethods())


export default app