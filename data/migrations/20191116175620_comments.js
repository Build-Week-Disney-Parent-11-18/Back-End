
exports.up = function(knex) {
  return knex.schema.createTable('comments', table => {
    table
      .increments();

    table
      .integer('user_id')
      .references('id')
      .inTable('users')
      .onUpdate('CASCADE')
      .onDelete('RESTRICT')

    table
      .integer('request_id')
      .references('id')
      .inTable('requests')
      .onUpdate('CASCADE')
      .onDelete('RESTRICT')

    table
      .varchar('comment', 255).notNullable();

    table
      .timestamps(true, true);
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('comments');
};