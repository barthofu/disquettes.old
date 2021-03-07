const { waitingDisquette } = require('../../models/Disquette')

module.exports = (req, res) => {

    req.body.tags = req.body.tag
    req.body.author = req.user.username || undefined

    waitingDisquette.post(req.body).then(result => {

        res.json({
            status: "success",
            message: "Disquette added to database",
            data: result
        })

    }).catch(err => {

        res.json({
            status: "error",
            message: "Error on insertion",
            details: err
        })

    })

}