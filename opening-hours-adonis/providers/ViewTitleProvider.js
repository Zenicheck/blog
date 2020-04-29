'use strict'

const { ServiceProvider } = require('@adonisjs/fold')


class ViewTitleProvider extends ServiceProvider {
  /**
   * Register namespaces to the IoC container
   *
   * @method register
   *
   * @return {void}
   */
  register () {
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
  boot () {
    //
    const View = this.app.use('Adonis/Src/View')
    const Env = this.app.use('Adonis/Src/Env')
    View.global('ctxTitle', () => Env.get('APP_TITLE') || '')
  }
}

module.exports = ViewTitleProvider
