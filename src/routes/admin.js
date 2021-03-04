const express = require('express')


let router = express.Router();

router
    .get('/', (req, res) => {

        res.render("admin/layout", { page: "index", title: "Disquette Admin", admin: false })
    })
    .get('/', (req, res) => getDisquette(req, res))
    .post('/', (req, res) => getDisquette(req, res))

module.exports = router;