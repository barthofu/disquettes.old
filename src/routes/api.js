const express                                   = require('express'),
      notFound                                  = require('../utils/404'),

      authLoggedIn                              = require('../middleware/auth/authLoggedIn'),

      postDisquette                             = require('../controllers/api/post'),
      getDisquette                              = require('../controllers/api/get'),

      { validateDisquette, waitingDisquette }   = require('../models/Disquette')

let router = express.Router();

router
    .post('/post', authLoggedIn(), postDisquette)

    .get('/get', getDisquette)

    .get(notFound)

module.exports = router;