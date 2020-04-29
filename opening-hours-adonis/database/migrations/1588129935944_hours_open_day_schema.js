'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class HoursOpenDaySchema extends Schema {
  up () {
    this.table('hours', (table) => {
      // alter table
      table.boolean('open').notNullable().defaultTo(true)
    })
  }

  down () {
    this.table('hours', (table) => {
      // reverse alternations
      table.dropColumn('open')
    })
  }
}

module.exports = HoursOpenDaySchema
