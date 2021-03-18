const { validateDisquette } = require('../../models/Disquette')

module.exports = (req, res) => {

    const pageOptions = {
        page: parseInt(req.query.page, 10) || 0,
        limit: parseInt(req.query.limit, 10) || 10
    }

    validateDisquette.findAll(pageOptions).then(results => {
        res.render("admin/layout", {page: "list", disquette: results, pageOptions: pageOptions})
    }).catch(err => {
        req.flash('error', err.message, err)
    })

}