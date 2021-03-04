const express = require('express')
let router = express.Router();

const pages = ['index', 'list', 'submit', '/', 'overview'];

router
    .get('/', (req, res) => {
        console.log(req.baseUrl)
        res.redirect(req.baseUrl +
            "/overview")
    })
    .get(['/:page'], (req, res) => sender(req, res, req.params.page))

.post((req, res) => getDisquette(req, res));

function sender(req, res, page) {
    if (pages.includes(page)) {
        return res.render("admin/layout", { page: page, title: "Disquette Admin", admin: false, user: { username: "LeZ", profil_url: "https://via.placeholder.com/150" } })
    } else {

        res.status(404).send('Not Found!');
    }
}

module.exports = router;