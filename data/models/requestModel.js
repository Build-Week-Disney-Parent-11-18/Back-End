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

// GET ALL USERS
function findUsers() { // ✅TESTED 
  return db('users');
}

// GET SPECIFIED REQUEST BY REQUEST ID
function findById(id) { // ✅TESTED 
  return db('requests')
    .where({ 'requests.requests_id':id })
    .first();
}

// GET SPECIFIED USER BY USER ID
function findUserById(id) { // ✅TESTED 
  return db('users')
    .where({ 'users.id':id })
    .first();
}

// ADD NEW REQUEST
function add(info) { // ✅TESTED 
  return db('requests')
    .insert(info, 'requests_id')
    .then(id =>{
      return id[0]
    })
}

// UPDATE REQUEST
function update(id, info) { // ✅TESTED 
  return db('requests')
    .update(info)
    .where({ 'requests.requests_id':id })
}

// DELETE REQUEST
function remove(id) { // ✅TESTED 
  return db('requests')
    .del()
    .where({ 'requests.requests_id':id })
}