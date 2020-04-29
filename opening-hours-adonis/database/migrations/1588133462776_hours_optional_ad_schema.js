'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class HoursOptionalAdSchema extends Schema {
  up () {
    this.table('hours', (table) => {
      // alter table
      table.string('ad', 512).nullable().alter()
    })
  }

  down () {
    this.table('hours', (table) => {
      // reverse alternations
    })
  }
}

module.exports = HoursOptionalAdSchema
