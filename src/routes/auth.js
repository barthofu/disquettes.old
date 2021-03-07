const { json }              = require('express'),
      express               = require('express'),
      connectEnsureLogin    = require('connect-ensure-login'),
      passport              = require('passport'),

      notFound              = require('../utils/404'),

      authLoggedOut         = require('../middleware/authLoggedOut'),
      register              = require('../middleware/register'),
      
      login                 = require('../controllers/auth/login')


let router = express.Router();

router
    .get((['/', '/login']), authLoggedOut('/'), (res, req) => req.render("auth/layout", { page: "login" }))
    .post('/login', login)

    .get(('/reset'), (res, req) => req.render("auth/layout", { page: "reset" }))
    .get('/logout', (req, res) => { req.logout(); res.redirect('/') } )

    .get(('/register'), (res, req) => req.render("auth/layout", { page: "register" }))
    .post('/register', authLoggedOut('/'), register, passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }), (req, res) => res.redirect('/'))

    .get('/private', connectEnsureLogin.ensureLoggedIn({ redirectTo: '/auth/login', setReturnTo: true }), (req, res) => res.json(req.user))

    .get(notFound)

module.exports = router;