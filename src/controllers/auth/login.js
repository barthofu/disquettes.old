const passport = require('passport')

module.exports = function(req, res, next) {

    passport.authenticate('local', function(err, user, info) {

        if (err) {

            req.flash("error", "Authentication impossible", err)
            return next(err);
        }

        if (! user) {

            req.flash("error", "probleme serveur")
            return res.redirect('/auth/login')
        }

        req.login(user, loginErr => {

            if (loginErr) {

                req.flash("error", "Authentication impossible", LoginErr)
                return next(loginErr)
            }

            req.flash("succes", "Authentifier", info)
            return res.redirect(req.session.returnTo || '/')
        })

    })(req, res, next)
}