const { waitingDisquette } = require('../../models/Disquette')

module.exports = (req, res) => {

    let { page = 0, limit = 20, tag, query = '' } = req.query

    let options = {}

    if (query) options.disquette = { $in : [ query ] }
    if (tag) options.tags = tag

    console.log(options)

    waitingDisquette.findBy(options, { page: parseInt(page), limit: parseInt(limit) }).then(results => {
        
        res.json(results)

        //res.render("admin/layout", {page: "list", results: results})

    }).catch(err => {
    
        req.flash('error', err.message, err)

    })

}