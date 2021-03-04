const express = require('express')
const getDisquette = require('../controllers/db/get')
const postDisquette = require('../controllers/db/post')

let router = express.Router();

router
    .post('/post', (req, res) => postDisquette(req, res))
    .get('/', (req, res) => getDisquette(req, res))
    .post('/', (req, res) => getDisquette(req, res))

module.exports = router;