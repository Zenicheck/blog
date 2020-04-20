import Router from 'koa-joi-router'

const router = Router()

router.prefix('/public')

router.get('/', async ctx => await ctx.render('index', { layout: false, ctx, title : 'Offre du moment' }))

export default router