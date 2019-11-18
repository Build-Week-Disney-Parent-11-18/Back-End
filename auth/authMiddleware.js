

module.exports = {
  validateCredentials
}

function validateCredentials(req, res, next) {
  if(!req.body.username){
    return res.status(400).json({ error: 'Please provide a username.' }) // ✅TESTED
  }else if(!req.body.password){
    return res.status(400).json({ error: 'Please provide a password.' }) // ✅TESTED
  }else{
    user = req.body
    next();
  };
};