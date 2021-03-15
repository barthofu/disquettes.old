const passport = require('passport'),
Account       = require('../../models/User')


module.exports = (req, res, next) => {

  passport.authenticate('local', function(err, user, info) {
    if (err) {
      req.flash("error", "login impossible", err)
      return res.redirect('/auth/login')
      }
    if (!user) { 
      req.flash("error", "login impossible", info)
      return res.redirect('/auth/login')
     }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      req.flash("succes", "Authentifier")
      return res.redirect(req.session.returnTo || '/')
    });
  })(req, res, next); 
}