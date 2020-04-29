'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.on('/').render('welcome')

Route.group(() => {

    Route.get('/', 'HourController.index').as('hour.index')
    Route.get('/add', 'HourController.create').as('hour.create')
    Route.post('/store', 'HourController.store').as('hour.store').validator('StoreHour')

}).prefix('adm/hour').namespace('Admin')

Route.group(() => {

    Route.get('/', 'IndexController.index').as('adm.index')

}).prefix('adm').namespace('Admin')