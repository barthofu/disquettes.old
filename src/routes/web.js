const express = require('express')
const notFound = require('../utils/404')

let router = express.Router();

router
    .get('/', (req, res) => {
        var message;
        res.locals.message = message;
        res.render("submit/layout", { title: "Disquette", div: "submit" })
    })

module.exports = router;