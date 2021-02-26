
const Users = require('../users/users-model.js');

module.exports = (req, res, next) => {
  const credentials = req.body;

  if (credentials.username && credentials.password) {

    Users.findByUsername(credentials.username)
    .then((user) => {
      
      

      if (credentials.username === user.username) {
        res.status(401).json({message: "username taken"})
      } else {
        next()
      }
    })
    .catch(e => {
      
      res.status(400).json(e.message)
    })
  } else {
    res.status(401).json({message: "Username and password required"})
  }
 



  
  

  // next();
  /*
    IMPLEMENT

    1- On valid token in the Authorization header, call next.

    2- On missing token in the Authorization header,
      the response body should include a string exactly as follows: "token required".

    3- On invalid or expired token in the Authorization header,
      the response body should include a string exactly as follows: "token invalid".
  */
};






