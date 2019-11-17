// AUTHMODEL USED FOR:
  // REGISTER
  // LOGIN

  const db = require('../dbConfig');

  module.exports = {
    findBy,
    add
  };

  function findBy(username) { // ✅TESTED
    return db('users')
      .where({'users.username': username})
      .first();
  };

  function add(newUser) { // ✅TESTED
    return db('users')
      .insert(newUser)
  }