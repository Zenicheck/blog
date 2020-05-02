import Router from 'koa-joi-router'
import { authenticated } from '../helpers/middleware.mjs'
import { saveOffer, getOffer, findOffer, editOffer, deleteOffer } from '../helpers/offerRepository.mjs'

const Joi = Router.Joi

const router = Router()

const joiDefault = {
    type: 'form',
    continueOnError: true
}

router.prefix('/adm')

router.param('id', async (id, ctx, next) => {
    const [offer, e] = await findOffer(ctx.db)(id)
    if (!offer) return ctx.status = 404
    ctx.offer = { id: e.id, ...e.data() }
    ctx.request.body = ctx.offer
    await next()
})

router.get('/', authenticated(), async ctx => await ctx.render('adm', { ctx, title: 'Adm' }))

router.get('/offer', authenticated(), async ctx => {
    await ctx.render('adm-offer', { ctx, title: 'Listes des offres', offers: await getOffer(ctx.db) })
})

router.get('/offer/add', authenticated(), async ctx => await ctx.render('adm-offer-action', { ctx, title: 'Ajouter une offre' }))

router.get('/offer/edit/:id', authenticated(), async ctx => await ctx.render('adm-offer-action', { ctx, title: 'Editer l\'offre', offer: ctx.offer }))

router.get('/offer/delete/:id', authenticated(), async ctx => await ctx.render('adm-offer-action', { ctx, title: 'Editer l\'offre', offer: ctx.offer, delete: true }))

router.get('/offer/publish/:id', authenticated(), async ctx => await ctx.render('adm-offer-action', { ctx, title: 'Publier l\'offre', offer: ctx.offer, publish: true }))

router.post('/offer/store', {
    validate: {
        body: {
            offerTitle: Joi.string().max(255).min(4).required()
                .error(new Error('Veuillez entrer une titre entre 4 et 255 charactères')),
            offerLink: Joi.string().uri().required()
                .error(new Error('Veuillez entrer une lien')),
            offerId: Joi.string()
        },
        ...joiDefault
    }
}, authenticated(), async ctx => {
    if (ctx.request.body.offerId) {
        const [valid, e] = await findOffer(ctx.db)(ctx.request.body.offerId)
        if (!valid) return ctx.status = 404
        const offer = { id: e.id, ...e.data() }
        if (ctx.invalid) {
            return await ctx.render('adm-offer-action', { ctx, errors: ctx.invalid.body, title: 'Editer une offre', offer })
        }
        await editOffer(ctx.db)(offer.id)({ ...ctx.request.body, offerPublished: offer.offerPublished })
        ctx.flash('info', 'Offre modifiée')
        return ctx.redirect('/adm/offer')
    }
    if (ctx.invalid) {
        return await ctx.render('adm-offer-action', { ctx, errors: ctx.invalid.body, title: 'Ajouter une offre' })
    }
    await saveOffer(ctx.db)(ctx.request.body)
    ctx.flash('info', 'Offre créée')
    ctx.redirect('/adm/offer')
})

router.post('/offer/unstore', {
    validate: {
        body: {
            offerId: Joi.string().required()
        },
        ...joiDefault
    }
}, authenticated(), async ctx => {
    if (ctx.invalid) {
        return ctx.redirect('/adm/offer')
    }
    const [valid, _] = await findOffer(ctx.db)(ctx.request.body.offerId)
    if (!valid) return ctx.status = 404
    await deleteOffer(ctx.db)(ctx.request.body.offerId)
    ctx.flash('info', 'Offre supprimée')
    ctx.redirect('/adm/offer')
})

router.post('/offer/release', {
    validate: {
        body: {
            offerId: Joi.string().required()
        },
        ...joiDefault
    }
}, authenticated(), async ctx => {
    if (ctx.invalid) {
        return ctx.redirect('/adm/offer')
    }
    const [valid, e] = await findOffer(ctx.db)(ctx.request.body.offerId)
    if (!valid) return ctx.status = 404
    const offer = { ...e.data() }
    await editOffer(ctx.db)(ctx.request.body.offerId)({ ...offer, offerPublished: !offer.offerPublished })
    if (offer.offerPublished) {
        ctx.flash('info', 'Offre dépubliée')
    } else {
        ctx.flash('info', 'Offre publiée')
    }
    ctx.redirect('/adm/offer')
})

export default router