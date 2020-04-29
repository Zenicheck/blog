'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */


class IndexController {
    /**
     * Show adm dashboard.
     * GET adm
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {View} ctx.view
     */
    async index({ view }) {
        return view.render('admin.index', { title: 'Adm' })
    }
}

module.exports = IndexController
