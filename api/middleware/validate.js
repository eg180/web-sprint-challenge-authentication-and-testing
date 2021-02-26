
const Users = require('../users/users-model.js');

module.exports = (req, res, next) => {
  const { username } = req.body;
 
  console.log('inside the checkIfTaken middleware')

  Users.findByUsername(username)
  .then((user) => {
    console.log(`req.body.username: ${username}`)
    console.log(`user.username: ${user.username}`)
    if (req.body.username == user.username) {
      res.status(401).json('username taken')
    } else {
      next()
    }
  })
  .catch(e => {
    console.log('in catch on line 20')
    res.status(400).json(e.message)
  })
  
  

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






