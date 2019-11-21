const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authDB = require('../models/authModel');
const { validateCredentials } = require('../../auth/authMiddleware');

const router = express.Router();

function getJwtToken(id, role){
  const payload = {
    id,
    role
  };

  const secret = process.env.Jwt || `shhh, it's a secret 🔐`;

  const options = {
    expiresIn: '1d'
  };

  return jwt.sign(payload, secret, options);
}

// CREATE NEW USER
router.post('/register', [validateCredentials], (req, res) => { 
  if(!user.last_name){
    return res.status(400).json({ error: 'Please provide your last name.' }); // ✅TESTED 
  }else if(!user.first_name){
    return res.status(400).json({ error: 'Please provide your first name.' }); // ✅TESTED 
  }else if(!user.role){
    return res.status(400).json({ error: 'Please provide your role.' }); // ✅TESTED 
  }else if(!user.email){
    return res.status(400).json({ error: 'Please provide an email.' }); // ✅TESTED
  }else{
    const hash = bcrypt.hashSync(user.password, 10);
    user.password = hash;
    
    authDB.findByUsername(user.username)
      .then(findUserByUsername => {
        if(findUserByUsername){
          res.status(400).json({ error: 'An account with that username already exists in the database.' }); // ✅TESTED
        }else{
          authDB.findByEmail(user.email)
            .then(findUserByEmail => {
              if(findUserByEmail){
                res.status(400).json({ error: 'An account with this email already exists in the database.' }); // ✅TESTED 
              }else{
                authDB.add(user)
                  .then(store => {
                      authDB.findByUsername(user.username)
                        .then(newUser => {
                          const token = getJwtToken(newUser.user_id, newUser.role);
                          res.status(201).json({ token, 'newUser_id': newUser.user_id, 'username': newUser.username }); // ✅TESTED 
                        })
                        .catch(error => {
                          res.status(500).json({ error: 'Internal server error AT REGISTRATION: 4 levels' }); // ✅TESTED 
                        })
                  })
                  .catch(error => {
                    res.status(500).json({ error: 'Internal server error AT REGISTRATION: 3 levels' }); // ✅TESTED 
                  })
              }
            })
            .catch(error => {
              res.status(500).json({ error: 'Internal server error AT REGISTRATION: 2 levels' }); 
            })
        }
      })
    .catch(error => {
      res.status(500).json({ error: 'Internal server error AT REGISTRATION: 1 level' }); 
    })
}})

// LOG IN USER
router.post('/login', [validateCredentials], (req, res) => {
  authDB.findByUsername(user.username)
    .then(findUser => {
      if(findUser && bcrypt.compareSync(user.password, findUser.password)){
        const token = getJwtToken(findUser.user_id, findUser.role);
        res.status(201).json({ token, 'loggedInUser_id': findUser.user_id, 'username': findUser.username }); // ✅TESTED  
      }else{
        res.status(401).json({ error: 'Invalid credentials' }); // ✅TESTED  
      }
    })
    .catch(error => {
      res.status(500).json({ error: 'Internal server error: login' }); // ✅TESTED  
    })
})

module.exports = router;