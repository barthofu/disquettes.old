const { waitingDisquette } = require('../../models/Disquette')

module.exports = (req, res) => {
        
    waitingDisquette.post(req.body).then(results => {

        console.log("insertion succeful")
        req.flash("succes", "Disquette added to database", results)
        res.redirect('#')

    }).catch(err => {

        req.flash("error", "Error on insertion", err)
        res.redirect('#')
    })
    
}