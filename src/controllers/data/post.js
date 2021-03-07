const { waitingDisquette } = require('../../models/Disquette')

module.exports = (req, res) => {

    req.body.tags = req.body.tag
    req.body.author = req.user.username || undefined

    waitingDisquette.post(req.body).then(result => {

        req.flash('succes', "Disquette ajoutée à la base de donées", result)
        res.redirect('./submit')

    }).catch(err => {

        console.log(err)
        req.flash('error', "Erreur pendant la creation", err)
        res.redirect('./submit')

    })

}