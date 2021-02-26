const jwt = require("jsonwebtoken")
const Users = require('../users/users-model.js');

module.exports = (req, res, next) => {
  const { username, password } = req.body;
  const user = req.body 

  Users.findByUsername(username)
  if (req.username == res.username && req.password == res.password) {

    console.log('a match was found')
    next()
  } else {
    console.log('fix this')
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


function makeJwt(user) {
  const payload = {
    subject: user.id,
    username: user.username
  };
  const secret = process.env.JWT_SECRET || 'shhh'

  const options = {
      expiresIn: "2h",
  }
  return jwt.sign(payload, secret, options)

};




