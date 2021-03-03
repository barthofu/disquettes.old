const express = require('express')

let router = express.Router();

router
    .get('/', (req, res) => {
        var message;
        res.locals.message = message;
        res.render("submit/layout", { title: "Disquette", div: "submit" })
    })

module.exports = router;