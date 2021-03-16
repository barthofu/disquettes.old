const express   = require('express'),
      notFound  = require('../utils/404'),

      getTags   = require('../middleware/data/getTags')

let router      = express.Router()

router
  .get('/', getTags, (req, res) => res.render("index", { tags: req.tags }))

module.exports = router
