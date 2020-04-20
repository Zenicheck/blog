
const authenticated = () => (ctx, next) => ctx.isAuthenticated() ? next() : ctx.redirect('/so')

export { authenticated }