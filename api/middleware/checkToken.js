const jwt = require('jsonwebtoken');


module.exports = (req, res, next) => {
    const token = req.headers.authorization;
    const secret = process.env.JWT_SECRET || 'shhh'
    jwt.verify(token, secret, (err, decodedToken) => {
        if (err) {
            console.log('in 9')
            return res.status(401).json("token invalid")
        } else if (!req.headers.authorization) {
            console.log('in 12')
            return res.status(401).json( "missing token" )
        } else if (!token) {
            return res.status(401).json({ message: "token required"})
        }
        else {
            console.log('in 19')
            next()
        }
    })



   
  /*
    IMPLEMENT

    1- On valid token in the Authorization header, call next.

    2- On missing token in the Authorization header,
      the response body should include a string exactly as follows: "token required".

    3- On invalid or expired token in the Authorization header,
      the response body should include a string exactly as follows: "token invalid".
  */
};
