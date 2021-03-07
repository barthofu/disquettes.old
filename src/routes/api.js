const express                                   = require('express'),
      notFound                                  = require('../utils/404'),

      authLoggedIn                              = require('../middleware/authLoggedIn'),

      postDisquette                             = require('../controllers/data/post'),
      getDisquette                              = require('../controllers/data/get'),

      { validateDisquette, waitingDisquette }   = require('../models/Disquette')

let router = express.Router();

router
    .post('/post', authLoggedIn(), postDisquette)

    .get('/get', getDisquette)

    .get(notFound)

module.exports = router;