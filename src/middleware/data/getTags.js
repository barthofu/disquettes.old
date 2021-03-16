const { validateDisquette } = require("../../models/Disquette")

module.exports = async (req, res, next) => {

    let results = await validateDisquette.find().exec()

    req.tags = [...new Set(results.map(res => res.tags).flatMap(res => res))]

    next()
    
}