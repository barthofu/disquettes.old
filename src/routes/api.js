const express                                   = require('express'),
      notFound                                  = require('../utils/404'),

      authLoggedIn                              = require('../middleware/auth/authLoggedIn'),

      post                                      = require('../controllers/api/post'),
      get                                       = require('../controllers/api/get'),
      validate                                  = require('../controllers/api/validate'),

      { validateDisquette, waitingDisquette }   = require('../models/Disquette')

let router = express.Router();

router
    .post('/post', authLoggedIn(), post)

    .get('/get', get)

    .post('/validate', validate)

    .get(notFound)

module.exports = router;