import Router from 'koa-joi-router'
import { saveOffer, getOffer } from '../helpers/offerRepository.mjs'

const Joi = Router.Joi

const router = Router()

const joiDefault = {
    type: 'form',
    continueOnError: true
}

router.prefix('/adm')

router.get('/', async ctx => await ctx.render('adm', { ctx, title: 'Adm' }))

router.get('/offer', async ctx => {
    await ctx.render('adm-offer', { ctx, title: 'Listes des offres', offers: await getOffer(ctx.db) }) 
})

router.get('/offer/add', async ctx => await ctx.render('adm-offer-action', { ctx, title: 'Ajouter une offre' }))

router.get('/offer/edit/:id', async ctx => await ctx.render('adm-offer-action', { ctx, title: 'Editer l\'offre' }))

router.post('/offer/store', {
    validate: {
        body: {
            offerTitle: Joi.string().max(255).min(4).required()
                .error(new Error('Veuillez entrer une titre entre 4 et 255 charactères')),
            offerLink: Joi.string().uri().required()
                .error(new Error('Veuillez entrer une lien')),
            offerId: Joi.number().positive()
        },
        ...joiDefault
    }
}, async ctx => {
    if (ctx.invalid) {
        return await ctx.render('adm-offer-action', { ctx, errors: ctx.invalid.body, title: 'Ajouter une offre' })
    }
    await saveOffer(ctx.db)(ctx.request.body)
    ctx.redirect('/adm/offer')
})

export default router