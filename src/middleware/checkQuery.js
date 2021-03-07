
module.exports = (req, res, next) {


    if (req.query.query) next()

    else {

        res.render("")
    }


} 