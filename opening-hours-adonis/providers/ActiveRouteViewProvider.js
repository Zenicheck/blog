'use strict'

const { ServiceProvider } = require('@adonisjs/fold')

class ActiveRouteViewProvider extends ServiceProvider {
  /**
   * Register namespaces to the IoC container
   *
   * @method register
   *
   * @return {void}
   */
  register() {
    //
  }

  /**
   * Attach context getter when all providers have
   * been registered
   *
   * @method boot
   *
   * @return {void}
   */
  boot() {
    //
    const View = this.app.use('Adonis/Src/View')
    View.global('isActive', (route, desired) => (desired == '/adm' && route.split('?')[0] == '/adm')
      || (desired != '/adm' && route.indexOf(desired) != -1))
  }
}

module.exports = ActiveRouteViewProvider
