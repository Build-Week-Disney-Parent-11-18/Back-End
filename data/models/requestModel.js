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
    .where({ 'requests.request_id':id })
    .first();
}

// GET SPECIFIED USER BY USER ID
function findUserById(id) { // ✅TESTED 
  return db('users')
    .where({ 'users.user_id':id })
    .first();
}

// ADD NEW REQUEST
function add(info) { // ✅TESTED 
  return db('requests')
    .insert(info, 'request_id')
    .then(id =>{
      return id[0]
    })
}

// UPDATE REQUEST
function update(id, info) { // ✅TESTED 
  return db('requests')
    .update(info)
    .where({ 'requests.request_id':id })
}

// DELETE REQUEST
function remove(id) { // ✅TESTED 
  return db('requests')
    .del()
    .where({ 'requests.request_id':id })
}