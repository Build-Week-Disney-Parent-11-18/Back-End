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
  }else{
    const hash = bcrypt.hashSync(user.password, 10);
    user.password = hash;
    
    authDB.findBy(user.username)
      .then(findUser => {
        if(findUser){
          res.status(400).json({ error: 'An account with that username already exists in the database.' }); // ✅TESTED 
        }else{
          authDB.add(user)
          .then(store => {
            const token = getJwtToken(user.id, user.role);
            res.status(201).json({ token }); 
          })
          .catch(error => {
            res.status(500).json({ error: 'Internal server error: registration' }); // ✅TESTED  
          })
        }
      })
      .catch(error => {
        res.status(500).json({ error: 'Internal server error: registration' }); // ✅TESTED  
      })
  }
})

// LOG IN USER
router.post('/login', [validateCredentials], (req, res) => {
  authDB.findBy(user.username)
    .then(findUser => {
      if(findUser && bcrypt.compareSync(user.password, findUser.password)){
        const token = getJwtToken(findUser.id, findUser.role);

        res.status(201).json({ token }); // ✅TESTED  
      }else{
        res.status(401).json({ error: 'Invalid credentials' }); // ✅TESTED  
      }
    })
    .catch(error => {
      res.status(500).json({ error: 'Internal server error: login' }); // ✅TESTED  
    })
})

module.exports = router;