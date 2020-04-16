import Router from '@koa/router'

const router = new Router({ prefix: '/adm' })

router.get('/', async ctx => await ctx.render('adm', { ctx, title: 'Adm' }))

export default router