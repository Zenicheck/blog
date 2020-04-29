'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const Hours = use('App/Models/Hour')

/**
 * Resourceful controller for interacting with hours
 */
class HourController {
    /**
     * Show a list of all hours.
     * GET hours
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {View} ctx.view
     */
    async index({ request, response, view }) {
        const hours = await Hours.all()
        return view.render('admin.hours.index', { hours: hours.toJSON(), title: 'Horaires' })
    }

    /**
     * Render a form to be used for creating a new hour.
     * GET hours/add
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {View} ctx.view
     */
    async create({ request, session, response, view }) {
        return view.render('admin.hours.action', { title: 'Ajouter une plage horaire' })
    }

    /**
     * Create/save a new hour.
     * POST hours
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async store({ request, session, response, view }) {
        const bulk = request.all()
        console.dir(bulk)
        await Hours.create({
            day: bulk.hourDay,
            open: bulk.hourOpen === 'true',
            morning_open: bulk.hourMorningOpen === 'true',
            afternoon_open: bulk.hourAfternoonOpen === 'true',
            lunch_break: bulk.hourBreakFastOpening === 'true'
        })
        session.flash({ notification: 'Plage horaire ajoutée !' })
        return response.route('hour.index')
    }

    /**
     * Display a single hour.
     * GET hours/:id
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {View} ctx.view
     */
    async show({ params, request, response, view }) {
    }

    /**
     * Render a form to update an existing hour.
     * GET hours/:id/edit
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {View} ctx.view
     */
    async edit({ params, request, response, view }) {
    }

    /**
     * Delete a hour with id.
     * DELETE hours/:id
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async destroy({ params, request, response }) {
    }
}

module.exports = HourController
