const express = require('express');
const notFound = require('../utils/404')

const getStats = require('../controllers/admin/stats')
const checkUser = require('../controllers/admin/checkUser')
const showDashboard = require('../controllers/admin/showDashboard')

let router = express.Router()

router
    .get('/', (req, res) => { console.log(1); res.redirect('/admin/overview')})

    .get('/overview', checkUser, showDashboard)
    .get('/list', checkUser, getStats, showDashboard)
    .get('/waiting', checkUser, showDashboard)

    .get(notFound)

module.exports = router;