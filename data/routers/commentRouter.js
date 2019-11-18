const express = require('express');
const commentDB = require('../models/commentModel');

const router = express.Router();

// GET ALL COMMENTS
router.get('/comments', (req, res) => {
  commentDB.find()
    .then(comments => {
      res.status(200).json(comments)
    })
    .catch(error => {
      res.status(500).json({ error: 'Internal server error at GET COMMENTS: comment.find' })
    })
})

// GET ALL COMMENTS MADE BY SPECIFIED USER BY USER ID
router.get('/users/:id/comments', (req, res) => {
  commentDB.findByUserId(req.params.id)
    .then(comments => {
      res.status(200).json(comments)
    })
    .catch(error => {
      res.status(500).json({ error: 'Internal server error at GET COMMENTS BY USER: comment.findByUserId' })
    })
})

// GET ALL COMMENTS ON SPECIFIED REQUEST BY REQUEST ID
router.get('/requests/:id/comments', (req, res) => {
  commentDB.findByRequestId(req.params.id)
    .then(comments => {
      res.status(200).json(comments)
    })
    .catch(error => {
      res.status(500).json({ error: 'Internal server error at GET COMMENTS BY REQUEST: comment.findByRequestId' })
    })
})

// GET SPECIFIED COMMENT BY COMMENT ID
router.get('/comments/:id', (req, res) => {
  commentDB.findByCommentId(req.params.id)
    .then(comments => {
      res.status(200).json(comments)
    })
    .catch(error => {
      res.status(500).json({ error: 'Internal server error at GET COMMENTS BY COMMENT: comment.findByCommentId' })
    })
})

// ADD A NEW COMMENT
router.post('/users/:userid/requests/:requestid/comments', (req, res) => {
  const userid = req.params.userid;
  const requestid = req.params.requestid;
  const info = req.body;
  info.user_id = userid;
  info.request_id = requestid;
  if(!info.comment){
    res.status(400).json({ error: 'Please add a comment' })
  }else{
    commentDB.add(info)
      .then(comment => {
        commentDB.findByCommentId(comment)
          .then(newComment => {
            res.status(200).json(newComment)
          })
          .catch(error => {
          res.status(500).json({ error: 'Internal server error at POST COMMENT: comment.add.findByCommentId' })
        })
      })
      .catch(error => {
        res.status(500).json({ error: 'Internal server error at POST COMMENT: comment.add' })
      })
  }
})

// UPDATE A COMMENT
// ADD ERROR FOR RECEIVING ID THAT IS NOT AN INTEGER???
router.put('/comments/:id', (req, res) => {
  const id = req.params.id;
  commentDB.findByCommentId(id)
    .then(findComment => {
      if(!findComment){
        res.status(404).json({ error: `There is no comment in the database with the id ${id}` })
      }else{
        commentDB.update(id, req.body)
          .then(updated => {
            commentDB.findByCommentId(id)
              .then(updatedComment => {
                res.status(201).json(updatedComment)
              })
              .catch(error => {
                res.status(500).json({ error: 'Internal server error at UPDATE COMMENT: comment.findByCommentId.update.findByCommentId' })
              })
          })
          .catch(error => {
            res.status(500).json({ error: 'Internal server error at UPDATE COMMENT: comment.findByCommentId.update' })
          })
      }
    })
    .catch(error => {
      res.status(500).json({ error: 'Internal server erro at UPDATE COMMENTr: comment.findByCommentId' })
    })
})

// DELETE A COMMENT
router.delete('/comments/:id', (req, res) => {
  const id = req.params.id;
  commentDB.findByCommentId(id)
    .then(comment => {
      if(!comment){
        res.status(404).json({ error: `There is no comment in the database with the id ${id}` })
      }else{
        commentDB.remove(id)
          .then(deleted => {
            res.status(201).json(comment)
          })
          .catch(error => {
            res.status(500).json({ error: 'Internal server error at DELETE COMMENT: comment.findByCommentId.remove' })
          })
      }
    })
    .catch(error => {
      res.status(500).json({ error: 'Internal server error at DELETE COMMENT: comment.findByCommentId' })
    })
})

module.exports = router;