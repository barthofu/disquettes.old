const express = require('express');
const notFound = require('../utils/404')

const getStats = require('../controllers/admin/stats')
const checkUser = require('../controllers/admin/checkUser')
const showDashboard = require('../controllers/admin/showDashboard')
const postDisquette = require('../controllers/db/post')
let router = express.Router()

router
    .get('/', (req, res) => res.redirect('/admin/overview'))

.get('/overview', checkUser, getStats, showDashboard)
    .get('/list', checkUser, showDashboard)
    .get('/waiting', checkUser, showDashboard)
    .get('/submit', checkUser, showDashboard)
    .post('/submit', checkUser, (req, res, next) => {

        tags = []
        req.body.tag.forEach(element => {

            console.log(element)
            tags.push(element)
        });
        req.body.tags = tags
        req?.user?.username ? req.body.author = req.user.username : req.body.author = "Annonymous"


        next()

    }, postDisquette)

.get(notFound)

module.exports = router;