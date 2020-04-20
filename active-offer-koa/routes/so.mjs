import Router from 'koa-joi-router'
import passport from 'koa-passport'

const Joi = Router.Joi

const router = Router()

const joiDefault = {
    type: 'form',
    continueOnError: true
}

router.prefix('/so')

router.get('/', async ctx => {
    if (ctx.isAuthenticated()) {
        await ctx.flash('info', 'Vous êtes bien connecté !')
        return await ctx.redirect('/adm')
    }
    await ctx.render('so', { ctx, title: 'Se connecter', layout: false })
})

router.post('/', {
    validate: {
        body: {
            soEmail: Joi.string().email().required()
                .error(new Error('Veuillez entrez votre email')),
            soPassword: Joi.string().required()
                .error(new Error('Veuillez entrez votre mot de passe'))
        },
        ...joiDefault
    }
}, async ctx => {
    if (ctx.isAuthenticated()) {
        await ctx.flash('info', 'Vous êtes bien connecté !')
        return await ctx.redirect('/adm')
    }
    if (ctx.invalid) {
        return await ctx.render('so', { ctx, title: 'Se connecter', errors: ctx.invalid.body, layout: false })
    }
    return passport.authenticate('local', async (err, user) => {
        console.log(user)
        if (user === false) {
            ctx.status = 401
            const errors = { msg: 'Email ou Mot de Passe invalide' }
            return await ctx.render('so', { ctx, title: 'Se connecter', errors, layout: false })
        }
        ctx.login(user)
        await ctx.flash('info', 'Vous êtes bien connecté !')
        return await ctx.redirect('/adm')
    })(ctx)
})

router.get('/logout', async ctx => {
    await ctx.logout()
    await ctx.redirect('/so')
})

export default router