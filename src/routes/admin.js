const express                                   = require('express'),
      notFound                                  = require('../utils/404'),

      getStats                                  = require('../middleware/data/getStats'),
      authLoggedIn                              = require('../middleware/auth/authLoggedIn'),

      showDashboard                             = require('../controllers/admin/showDashboard'),
      submitDisquette                           = require('../controllers/submit/submit'),
      showWaiting                               = require('../controllers/admin/showWaiting'),

      { validateDisquette, waitingDisquette }   = require('../models/Disquette')

let router = express.Router()

router
    .get('/', (req, res) => res.redirect('/admin/overview'))

    .get('/overview', authLoggedIn(), getStats, (req, res) => res.render("admin/layout", {page: "overview", stats: req.args}))
    .get('/list', authLoggedIn(), (req, res) => res.render("admin/layout", {page: "list"}))
    .get('/waiting', authLoggedIn(), showWaiting)

    .get('/submit', authLoggedIn(), (req, res) => res.render("admin/layout", {page: "submit"}))
    .post('/submit', authLoggedIn(), submitDisquette)

    .get('/disquette/:id', authLoggedIn(), (req, res) =>{})

    .get(notFound)

module.exports = router