const Account = require('../models/User')

module.exports = (req, res, next) => {

    console.log('registering user')

    acc = new Account({

        username: req.body.username,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        mail: req.body.mail

    }) 

    Account.register(acc, req.body.password,

        function(err) {

            if (err) {

                req.flash("error", "Création du compte impossible", err)
                res.redirect('/auth/register')
            }

            req.flash("succes", "Création du compte réussie!")
            console.log('new user registered!'+ acc.username)

            next()
        }
    )
}