const mongoose = require('mongoose')
const Disquette = mongoose.model('disquettes', require("../models/Disquette"), 'disquettes')

module.exports = (req, res) => {

    let { tag, age, genre = 2, nb = 10, name = "?????" } = req.body

    if (!tag) return

    Disquette
        .find({
            tags: tag,
            genre
        })
        .select({ _id: 0, updatedAt: 0 })
        .exec((e, results) => {

            if (e) console.error(e)

            if (age) results = results.filter(result => result.age === age)

            results.forEach((result, i) => {
                results[i].disquette = result.disquette.map(disquette => disquette.split("%NAME%").join(name))
            })

            res.json(
                results.slice(0, nb)
            )

        })

}