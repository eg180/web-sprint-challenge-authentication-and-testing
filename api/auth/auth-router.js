
const Users = require('../users/users-model.js');
const router = require('express').Router();
// const restricted = require('../middleware/restricted.js')
const validateExistingUser = require('../middleware/validate.js')




router.get('/users', (req, res) => {
  Users.getAll()
  .then(users => {
    res.status(200).json(users)
  })
});

router.post('/register', (req, res) => {
  // res.end('implement register, please!');
  const { username, password } = req.body;
  const user = req.body;
  console.log(user);

  if (username && password) {

    Users.add(user)
    .then(res => {
      res.status(200).json("Welcome to the Dad Joke's API!")
    })
    .catch(err => {
      res.status(401).json(err.message)
    })
  } else {
    res.status(401).json('please supply both a username and password')
  }


  /*
    IMPLEMENT
    You are welcome to build additional middlewares to help with the endpoint's functionality.

    1- In order to register a new account the client must provide `username` and `password`:
      {
        "username": "Captain Marvel", // must not exist already in the `users` table
        "password": "foobar"          // needs to be hashed before it's saved
      }

    2- On SUCCESSFUL registration,
      the response body should have `id`, `username` and `password`:
      {
        "id": 1,
        "username": "Captain Marvel",
        "password": "2a$08$jG.wIGR2S4hxuyWNcBf9MuoC4y0dNy7qC/LbmtuFBSdIhWks2LhpG"
      }

    3- On FAILED registration due to `username` or `password` missing from the request body,
      the response body should include a string exactly as follows: "username and password required".

    4- On FAILED registration due to the `username` being taken,
      the response body should include a string exactly as follows: "username taken".
  */
});

router.post('/login', validateExistingUser, (req, res) => {
  const { username, password } = req.body;
  const user = req.body

  Users.findByUsername(user.username)
  .then(u => {
    res.status(200).json(u)
  })
  .catch(err => {
    res.status(401).json(err.message)
  })


})

// router.post('/login', (req, res) => {
//   const { username, password } = req.body;
//   const user = req.body;
//   console.log(user.username);

//   Users.findByUsername(user.username)

//   .then(user => {
//     res.status(200).json(user)
//   })
//   .catch(err => {
//     res.status(401).json(err.message)

//   /*
//     IMPLEMENT
//     You are welcome to build additional middlewares to help with the endpoint's functionality.

//     1- In order to log into an existing account the client must provide `username` and `password`:
//       {
//         "username": "Captain Marvel",
//         "password": "foobar"
//       }

//     2- On SUCCESSFUL login,
//       the response body should have `message` and `token`:
//       {
//         "message": "welcome, Captain Marvel",
//         "token": "eyJhbGciOiJIUzI ... ETC ... vUPjZYDSa46Nwz8"
//       }

//     3- On FAILED login due to `username` or `password` missing from the request body,
//       the response body should include a string exactly as follows: "username and password required".

//     4- On FAILED login due to `username` not existing in the db, or `password` being incorrect,
//       the response body should include a string exactly as follows: "invalid credentials".
//   */
// });







module.exports = router;
