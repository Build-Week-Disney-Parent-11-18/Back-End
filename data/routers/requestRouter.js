const express = require('express');
const requestDB = require('../models/requestModel');

const router = express.Router();

/*********************************** MIDDLEWARE ***********************************/
const validateRequestID = (req, res, next) => {
  const id = req.params.id;
  requestDB.findById(id)
    .then(findRequest => {
      if(!findRequest){
        res.status(404).json({ error: `There is no request in the database with the id ${id}` })
      }else{
        next()
      }
    })
}

/*********************************** ENDPOINTS ***********************************/
// GET REQUESTS
router.get('/requests', (req, res) => {
  requestDB.find()
    .then(requests => {
      res.status(200).json(requests)
    })
    .catch(error => {
      res.status(500).json({ error: 'Internal server error at GET REQUESTS: request.find' })
    })
})

// GET SPECIFIED REQUEST
router.get('/requests/:id', [validateRequestID], (req, res) => {
  requestDB.findById(req.params.id)
    .then(request => {
      res.status(200).json(request)
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
    res.status(400).json({ error: 'Please add a meeting place' })
  }else if(!info.meeting_time){
    res.status(400).json({ error: 'Please add a meeting time' })
  }else if(!info.number_of_kids){
    res.status(400).json({ error: 'Please add the number of kids' })
  }else if(!info.description){
    res.status(400).json({ error: 'Please add a description' })
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
                  res.status(200).json(newRequest)
                })
                .catch(error => {
                  res.status(500).json({ error: 'Internal server error at POST REQUEST: request.add.findById' })
                })
            })
            .catch(error => {
              res.status(500).json({ error: 'Internal server error at POST REQUEST: request.add' })
            })
        // }
      // })
  }
})

// UPDATE REQUEST
router.put('/requests/:id', [validateRequestID], (req, res) => {
  const id = req.params.id;
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

module.exports = router;