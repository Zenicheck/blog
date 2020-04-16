import Router from '@koa/router'

const router = new Router({ prefix: '/public' })

router.get('/', async ctx => await ctx.render('index', { layout: false, ctx, title : 'Offre du moment' }))

export default router