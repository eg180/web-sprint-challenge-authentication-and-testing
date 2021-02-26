// do not make changes to this file
const router = require('express').Router();
const jokes = require('./jokes-data');
const checkToken = require('../middleware/checkToken.js');

router.get('/', checkToken, (req, res) => {
  console.log('made it to 7')
  res.status(200).json(jokes);
});

module.exports = router;
