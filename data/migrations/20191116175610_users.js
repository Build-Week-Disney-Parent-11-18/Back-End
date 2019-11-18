
exports.up = function(knex) {
  return knex.schema
  
  .createTable('users', table => {
    table
      .increments();

    table
      .varchar('username', 128).notNullable().unique();

    table
      .varchar('last_name', 255).notNullable();

    table
      .varchar('first_name', 255).notNullable();

    table
      .varchar('password', 255).notNullable();

    table
      .varchar('role', 128).notNullable();

    table
      .timestamps(true, true);
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('users');
};
