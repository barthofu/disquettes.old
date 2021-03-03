const express = require('express')
const mongoose = require('mongoose')
const Disquette = mongoose.model('disquettes', require("../models/Disquette"), 'disquettes')



function main(req, res) {

    let args = req.body

    if (!args.disquette) return res.send(insertError("no disquette provided"))

    try {
        let disquette = new Disquette(args)
        disquette.save(e => {
            if (e) res.send(insertError(e))
            else {
                console.log("insertion successful")
                res.send("insertion successful")
            }
        })
    } catch (e) {
        res.send(insertError(e))
    }


}

function insertError(e) {

    console.error(e)

    return e

}

let router = express.Router();

router
    .get('/', (req, res) => main(req, res))
    .post('/', (req, res) => main(req, res))
    .get('/web', (messages, req, res) => {
        res.render("submit/submit", { title: "Disquette" })
    })

module.exports = router;