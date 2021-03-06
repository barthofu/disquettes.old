const { json } = require('express');
const express = require('express'),
    connectEnsureLogin = require('connect-ensure-login'),
    passport = require('passport'),
    Account = require('../models/User'),
    notFound = require('../utils/404')




let router = express.Router();

router
    .get((['/', '/login']), connectEnsureLogin.ensureLoggedOut('/'), (res, req) => {


        req.render("auth/layout", { page: "login" })

    })
    .get(('/register'), (res, req) => {

        req.render("auth/layout", { page: "register" })

    })
    .get(('/reset'), (res, req) => {

        req.render("auth/layout", { page: "reset" })

    })
    .get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');

    })


.post('/login', function(req, res, next) {

    passport.authenticate('local', function(err, user, info) {
      if (err) {
        return next(err);
      }
      if (! user) {
         return res.render("auth/layout", { page: "login", message: { name: "loginError"} })
      }

      req.login(user, loginErr => {
        if (loginErr) {
            return next(loginErr);
        }
        return res.redirect(req.session.returnTo ||'/');
      });      

    })(req, res, next);
  })



.post('/register', register, passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }),
    function(req, res) {
        res.redirect('/');
    })



.get('/private', connectEnsureLogin.ensureLoggedIn({ redirectTo: '/auth/login', setReturnTo: true }), (req, res) => {
    // res.send("REQUEST:" + JSON.stringify(req) + "\n sender: " + JSON.stringify(res))
    res.json(req.user)
})



.get(notFound)

function register(req, res, next) {

    console.log('registering user');
    Account.register(new Account({
            username: req.body.username,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            mail: req.body.mail
        }), req.body.password,
        function(err) {
            if (err) {
                res.render("auth/layout", { page: "register", message: err })
            }
            console.log('user registered!');
            next()
        })
}

module.exports = router;