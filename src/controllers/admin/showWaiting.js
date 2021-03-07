const { waitingDisquette } = require('../../models/Disquette')

module.exports = (req, res) => {

    const pageOptions = {
        page: parseInt(req.query.page, 10) || 0,
        limit: parseInt(req.query.limit, 10) || 10
    }

    waitingDisquette.findAll(pageOptions).then(results => {

    
        console.log(results)
        res.render("admin/layout", {page: "waiting", disquette: results })

    }).catch(err => {

        req.flash('error', err.message, err)

    })

}