
exports.up = function(knex) {
  return knex.schema.createTable('requests', table => {
    table
      .increments();

    table
      .integer('user_id')
      .references('id')
      .inTable('users')
      .onUpdate('CASCADE')
      .onDelete('RESTRICT')

    table
      .varchar('meeting_place').notNullable();

    table
      .time('meeting_time', {precision: 0}).notNullable().defaultTo(knex.fn.now(0));

    table
      .integer('number_of_kids').notNullable();

    table
      .varchar('description').notNullable();

    table
      .timestamps(true, true);
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('requests');
};