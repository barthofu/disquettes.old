const { NetworkAuthenticationRequire } = require('http-errors')

const mongoose      = require('mongoose'),
      geoip         = require('geoip-lite'),

      visites       = mongoose.model('visits', require("../../models/Visite"), 'visits'),

      minutes       = 10

module.exports = (req, res, next) => {

    if (req.path === "/admin") next()

    let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress

    if (ip == '::1') ip = "0.0.0.0"

    visites.checkUser(ip, req.path, minutes).then(result => {

        if (result) {

            new visites({
                ip,
                createdAt: new Date(),
                country: ip !== "0.0.0.0" ? geoip.lookup(ip).country || "unknown" : "unknown",
                url: req.path,
                agent: req.headers['user-agent']
            }).save().then(() => {
    
                next()
            })
        }
        else {
            next()
        }
    })

}