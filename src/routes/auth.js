const { json } = require('express');
const express = require('express'),
    connectEnsureLogin = require('connect-ensure-login'),
    passport = require('passport'),
    Account = require('../models/User'),
    notFound = require('../utils/404')


let router = express.Router();

router
    .get((['/', '/login']), connectEnsureLogin.ensureLoggedOut('/'), (res, req, ) => {


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


.post('/login', passport.authenticate('local', { failureRedirect: 'login', successReturnToOrRedirect: '/' }), function(req, res) {
    res.redirect('/');
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