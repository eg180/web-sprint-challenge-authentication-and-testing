module.exports = (req, res, next) => {
    if (user) {
      
        next()
    } else {
        res.status(401).json({ error: "please enter both a username and password"})
    }
  /*
    IMPLEMENT

    1- On valid token in the Authorization header, call next.

    2- On missing token in the Authorization header,
      the response body should include a string exactly as follows: "token required".

    3- On invalid or expired token in the Authorization header,
      the response body should include a string exactly as follows: "token invalid".
  */
};
