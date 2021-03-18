const passport = require('passport'),
Account       = require('../../models/User')


module.exports = (req, res) => {

    acc = new Account({
        username: req.body.username,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        mail: req.body.mail,
        password: req.body.password
    })


    Account.register(acc, req.body.password)
.then(result =>{

    console.log('registering user: ' + acc.username)
    passport.authenticate('local')(req, res, function () {
        return res.redirect(req.session.returnTo || '/')
      });

    }).catch(err=>{
            console.log("err register: " +err)
            req.flash("error", "Création du compte impossible", err)
            res.redirect('/auth/register')
    })
}
