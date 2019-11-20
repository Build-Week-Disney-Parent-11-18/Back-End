const express = require('express');
const requestDB = require('../models/requestModel');

const router = express.Router();

/*********************************** MIDDLEWARE ***********************************/
const validateRequestID = (req, res, next) => {
  const id = req.params.id;
  requestDB.findById(id)
    .then(findRequest => {
      if(!findRequest){
        res.status(404).json({ error: `There is no request in the database with the id ${id}` }) // ✅TESTED 
      }else{
        next() // ✅TESTED 
      }
    })
}

/*********************************** ENDPOINTS ***********************************/
// GET REQUESTS
router.get('/requests', (req, res) => {
  requestDB.find()
    .then(requests => {
      res.status(200).json(requests) // ✅TESTED 
    })
    .catch(error => {
      res.status(500).json({ error: 'Internal server error at GET REQUESTS: request.find' })
    })
})

// GET USERS
router.get('/users', (req, res) => {
  requestDB.findUsers()
    .then(users => {
      res.status(200).json(users) // ✅TESTED 
    })
    .catch(error => {
      res.status(500).json({ error: 'Internal server error at GET USERS: request.findUsers' })
    })
})

// GET SPECIFIED REQUEST
router.get('/requests/:id', [validateRequestID], (req, res) => {
  requestDB.findById(req.params.id)
    .then(request => {
      res.status(200).json(request) // ✅TESTED 
    })
    .catch(error => {
      res.status(500).json({ error: 'Internal server error at GET SPECIFIED REQUEST: request.findById' })
    })
})

// POST REQUEST
router.post('/users/:id/requests', (req, res) => {
  const id = req.params.id;
  const info = req.body;
  info.user_id = id;
  if(!info.meeting_place){
    res.status(400).json({ error: 'Please add a meeting place' }) // ✅TESTED
  }else if(!info.meeting_time){
    res.status(400).json({ error: 'Please add a meeting time' }) // ✅TESTED
  }else if(!info.number_of_kids){
    res.status(400).json({ error: 'Please add the number of kids' }) // ✅TESTED
  }else if(!info.description){
    res.status(400).json({ error: 'Please add a description' }) // ✅TESTED
  }else{
    // requestDB.findUserById(id)
    //   .then(user => {
    //     if(!user){
    //       res.status(404).json({ error: `There is no user in the database with the id ${id}` })
    //     }else{
          requestDB.add(info)
            .then(request => {
              requestDB.findById(request)
                .then(newRequest => {
                  res.status(201).json(newRequest) // ✅TESTED
                })
                .catch(error => {
                  res.status(500).json({ error: 'Internal server error at POST REQUEST: request.add.findById' })
                })
            })
            .catch(error => {
              res.status(500).json({ error: 'Internal server error at POST REQUEST: request.add' }) // ✅TESTED
            })
        // }
      // })
  }
})

// UPDATE REQUEST
router.put('/requests/:id', [validateRequestID], (req, res) => {
  const id = req.params.id;
  if(!req.body){
    res.status(400).json({ error: 'Please provide at least one value to update.' })
  }else{
    requestDB.findById(id)
      .then(request => {
        requestDB.update(id, req.body)
          .then(updated => {
            requestDB.findById(id)
            .then(updatedRequest => {
              res.status(201).json(updatedRequest)
            })
            .catch(error => {
              res.status(500).json({ error: 'Internal server error at UPDATE REQUEST: request.findById.update.findById' })
            })
          })
          .catch(error => {
            res.status(500).json({ error: 'Internal server error at UPDATE REQUEST: request.findById.update' })
          })
      })
      .catch(error => {
        res.status(500).json({ error: 'Internal server error at UPDATE REQUEST: request.findById' })
      })
  }
})

// DELETE REQUEST
router.delete('/requests/:id', [validateRequestID], (req, res) => {
  requestDB.findById(req.params.id)
    .then(request => {
      requestDB.remove(req.params.id)
        .then(deleted => {
          res.status(201).json(request)
        })
        .catch(error => {
          res.status(500).json({ error: 'Internal server error at DELETE REQUEST: request.add' })
        })
    })
    .catch(error => {
      res.status(500).json({ error: 'Internal server error at DELETE REQUEST: request.remove' })
    })
})

// EMAIL COMMENTOR
router.get('/users/requests/:id', (req, res) => {
  requestDB.emailUser(req.params.id)
    .then(username => {
      res.status(200).json(username)
    })
})

module.exports = router;