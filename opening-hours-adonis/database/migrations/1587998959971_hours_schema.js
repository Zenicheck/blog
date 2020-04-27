'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class HoursSchema extends Schema {
  up () {
    this.create('hours', (table) => {
      table.increments()
      table.string('day', 25).notNullable().unique()
      table.string('ad', 512).notNullable()
      table.string('opening_morning', 5).nullable()
      table.string('closing_morning', 5).nullable()
      table.string('opening_afternoon', 5).nullable()
      table.string('closing_afternoon', 5).nullable()
      table.boolean('lunch_break').notNullable()
      table.boolean('visible').notNullable().defaultTo(false)
      table.timestamps()
    })
  }

  down () {
    this.drop('hours')
  }
}

module.exports = HoursSchema
