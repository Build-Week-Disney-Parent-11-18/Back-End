const db = require('../dbConfig');

module.exports = {
  find,
  findUsers,
  findById,
  findUserById,
  add,
  update,
  remove
}

// GET ALL REQUESTS FOR SEARCH
function find() { // ✅TESTED
  return db('requests');
}

function findUsers() {
  return db('users');
}

// GET SPECIFIED REQUEST BY REQUEST ID
function findById(id) { // ✅TESTED
  return db('requests')
    .where({ 'requests.id':id })
    .first();
}

// GET SPECIFIED USER BY USER ID
function findUserById(id) {
  return db('users')
    .where({ 'users.id':id })
    .first();
}

// ADD NEW REQUEST
function add(info) { // ✅TESTED
  return db('requests')
    .insert(info, 'id')
    .then(id =>{
      return id[0]
    })
}

// UPDATE REQUEST
function update(id, info) {
  return db('requests')
    .update(info)
    .where({ 'requests.id':id })
}

// DELETE REQUEST
function remove(id) {
  return db('requests')
    .del()
    .where({ 'requests.id':id })
}