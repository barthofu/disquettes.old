const mongoose = require('mongoose')
const Disquette = mongoose.model('waiting', require("../../models/Disquette"), 'waiting')

module.exports = (req, res, next) => {

    let args = req.body

    if (!args.disquette || !args.tags) return res.send(insertError("no disquette provided"))

    try {
        let disquette = new Disquette(args)
        disquette.save(e => {
            if (e) res.send(insertError(e))
            else {
                console.log("insertion successful")
               // res.send("insertion successful")
                next(disquette)
            }
        })
    } catch (err) {
      //  res.send(insertError(e))
        next(err)
    }

}

function insertError(e) {

    console.error(e)

    return e

}