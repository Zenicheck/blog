import path from 'path'
import Koa from 'koa'
import ejs from 'koa-ejs'
import logger from 'koa-logger'
import _static from 'koa-static'
import session from 'koa-generic-session'
import flash from 'koa-better-flash'
import bodyparser from 'koa-bodyparser'
import passport from 'koa-passport'
import admin from 'firebase-admin'
import dotenv from 'dotenv'

import indexRouter from './routes/index.mjs'
import admRouter from './routes/adm.mjs'
import soRouter from './routes/so.mjs'

const __dirname = path.resolve()

const config = dotenv.config().parsed

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

app.keys = [config.KEYS_1, config.KEYS_2]

ejs(app, {
  root: path.join(__dirname, 'views'),
  layout: 'template',
  viewExt: 'html.ejs',
  cache: false, //TODO turn on for production
  debug: false, //TODO turn off for profuction
})

app.use(bodyparser())

app.use(session({
  prefix: '__sess:',
  key: '__sid'
}))

import './helpers/so.mjs'
app.use(passport.initialize())
app.use(passport.session())

app.use(logger())

app.use(flash())

app.use(_static(path.join(__dirname, 'public')))

app.use(indexRouter.middleware())
app.use(admRouter.middleware())
app.use(soRouter.middleware())


export default app