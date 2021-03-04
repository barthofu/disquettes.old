const mongoose = require('mongoose')

const waitingDisquette = mongoose.model('waiting', require("../../models/Disquette"), 'waiting')
const validateDisquette = mongoose.model('validate', require("../../models/Disquette"), 'validate')
const visites = mongoose.model('visites', require("../../models/Visite"), 'visites')
const apiRequests = mongoose.model('apiRequests', require("../../models/Visite"), 'apiRequests')

module.exports = (req, res, next) => {

    let days = 60

    req.args = {}

    req.args.totalValidate = getTotalValidate()

    req.args.totalWaiting = getTotalWaiting()

    req.args.totalTags = getTotalTags()

    req.args.totalVisites = getTotalVisites(days)

    req.args.totalApiRequests = getTotalApiRequests()

    next()

}

function getTotalValidate () {

    return validateDisquette.find().exec((err, results) => results.length)

}

function getTotalWaiting () {

    return waitingDisquette.find().exec((err, results) => results.length)

}

function getTotalTags () {

    return validateDisquette.find().exec((err, results) => [...new Set(results.map(res => res.tags).flatMap(res => res))])

}

function getTotalVisites (days) {

    let now = new Date().getTime()

    return visites.find().exec((err, results) => results.filter(res => now - res.createdAt.getTime() < days * 24 * 60 * 60 * 1000))

}

function getTotalApiRequests (days) {

    let now = new Date().getTime()

    return apiRequests.find().exec((err, results) => results.filter(res => now - res.createdAt.getTime() < days * 24 * 60 * 60 * 1000))

}

