var express = require('express')
const notFound = require('../utils/404')

let router = express.Router()

router
  .get('/', (req, res) => res.send("Page d'accueil"))

module.exports = router
