import passport from 'koa-passport'
import bcrypt from 'bcrypt'
import strategies from 'passport-local'
import dotenv from 'dotenv'

const config = dotenv.config().parsed

passport.serializeUser((user, done) => done(null, user))

passport.deserializeUser((id, done) => done(null, id))

const LocalStrategy = strategies.Strategy

const local = new LocalStrategy({
    usernameField: 'soEmail',
    passwordField: 'soPassword'
}, async (username, password, done) => config.USERNAME === username ?
    bcrypt.compare(password, config.PASSWORD, (_, response) => done(null, response ? config.USERNAME : false))
    :
    done(null, false))

passport.use(local)