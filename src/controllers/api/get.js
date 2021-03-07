const { validateDisquette } = require('../../models/Disquette')

const girlNames = ["Caroline", "Béatrice", "Chloé", "Diana", "Margot", "Carla", "Mathilde", "Sarah", "Claire", "Joséphine", "Auriane", "Léna", "Maria"]

module.exports = (req, res) => {

    req.query.name = girlNames[Math.floor(Math.random() * girlNames.length)]

    let { tag, age = 0, genre = 0, nb = 1, name = "?????", lang = "FR" } = req.query

    age = parseInt(age)
    genre = parseInt(genre)
    nb = parseInt(nb)

    let options = { lang }

    if (tag !== 'all') options.tags = tag
    if (age !== 0) options.age = age
    if (genre !== 0) options.genre = genre

    return validateDisquette.findBy(options).then(results => {

        if (results.length === 0) res.json({ error: "No results", details: null })

        else {

            let result = results[Math.floor(Math.random() * results.length)]

            result.disquette = result.disquette.map(disquette => disquette.split("%NAME%").join(name))
    
            res.json({
                status: 'success',
                result
            })
        }

    }).catch(err => {

        res.json({ 
            status: 'error',
            message: err.message, 
            details: err 
        })

    })

}