const express = require('express')
const notFound = require('../utils/404')

const getDisquette = require('../controllers/db/get')
const postDisquette = require('../controllers/db/post')

let router = express.Router();

router
    .post('/post', postDisquette)
    .get('/', getDisquette)
    .post('/', getDisquette)

    .get(notFound)

module.exports = router;