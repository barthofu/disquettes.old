const { validateDisquette } = require('../../models/Disquette')

module.exports = (req, res) => {

    const pageOptions = {
        page: (parseInt(req.query.page, 10) || 1) -1,
        limit: parseInt(req.query.limit, 10) || parseInt(req.query.size, 10)  || 10
    }

    validateDisquette.countDocuments({}).then(count=>{
    validateDisquette.findAll(pageOptions).then(results => {

    
        res.json({
            status: 'success',
            data: results,
            last_page: Math.ceil(count/pageOptions.limit)

        })
    }).catch(err => {

        res.json({ 
            status: 'error',
            message: err.message, 
            details: err 
        })
    })
    })

}