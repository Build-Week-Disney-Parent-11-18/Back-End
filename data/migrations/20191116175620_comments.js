
exports.up = function(knex) {
  return knex.schema.createTable('comments', table => {
    table
      .increments();

    table
      .integer('user_id')
      .unsigned()
      .references('id')
      .inTable('users')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
      // .dropForeign('id')

    table
      .integer('request_id')
      .unsigned()
      .references('id')
      .inTable('requests')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
      // .dropForeign('id')

    table
      .varchar('comment', 255).notNullable();

    table
      .timestamps(true, true);
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('comments');
};