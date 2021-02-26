const bcrypt = require("bcryptjs");
const Users = require('../users/users-model.js');
const router = require('express').Router();
const jwt = require("jsonwebtoken");
// const restricted = require('../middleware/restricted.js')
const checkIfTaken = require('../middleware/checkIfTaken.js')




router.get('/users', (req, res) => {
  Users.getAll()
  .then(users => {
    res.status(200).json(users)
  })
});

router.post('/register', checkIfTaken, (req, res) => {
  // res.end('implement register, please!');
  const user = req.body;

  const hashedPassword = bcrypt.hashSync(user.password, 8);
  user.password = hashedPassword; // updates what the user input to the hashed version
  
  Users.add(user)
  .then(user => {
    res.status(200).json({ user: user.username, password: user.password })
  })
  .catch(err => {
    res.status(401).json(err.message)
  })

  // if (username && password) {

  //   Users.add(user)
  //   .then(res => {
  //     res.status(200).json("Welcome to the Dad Joke's API!")
  //   })
  //   .catch(err => {
  //     res.status(401).json(err.message)
  //   })
  // } else {
  //   res.status(401).json('please supply both a username and password')
  // }


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

router.post('/login', (req, res) => {
  const credentials = req.body;
  

  Users.findByUsername(credentials.username)

  .then(([user]) => {
    
   
    // console.log(bcrypt.compareSync(credentials.password, user.password))
    if (!user || !bcrypt.compareSync(credentials.password, user.password)) {
      return res.status(401).json({ error: "Nice try, hacker."})
    } else if (!user.username){
      res.status(401).json("Invalid credentials")
    }
    
    else {
      const token = makeJwt(user)
      const secret = process.env.JWT_SECRET || 'shhh'

      jwt.verify(token, secret, (err, decodedToken) => {
        if(err) {
          console.log(err)
          res.status(401).json({ error: "There was an error decoding token"})
        } else {
          console.log('token successfully created')
          const token = req.headers.authorization;
        }
      })
      res.status(200).json({message: "Welcome to the Dad Jokes API", token})
    }
  })
  .catch(err => {
    res.status(500).json(err.message)
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




module.exports = router;
