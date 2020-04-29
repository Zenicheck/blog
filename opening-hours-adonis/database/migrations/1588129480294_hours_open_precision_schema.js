'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class HoursOpenPrecisionSchema extends Schema {
  up() {
    this.table('hours', (table) => {
      // alter table
      table.boolean('morning_open').notNullable().defaultTo(true)
      table.boolean('afternoon_open').notNullable().defaultTo(true)
    })
  }

  down() {
    this.table('hours', (table) => {
      // reverse alternations
      this.dropColumn('morning_open')
      this.dropColumn('afternoon_open')
    })
  }
}

module.exports = HoursOpenPrecisionSchema
