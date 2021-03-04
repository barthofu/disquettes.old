const mongoose = require('mongoose')
const waitingDisquette = mongoose.model('waiting', require("../../models/Disquette"), 'waiting')
const validateDisquette = mongoose.model('validate', require("../../models/Disquette"), 'validate')
const visites = mongoose.model('visites', require("../../models/Visite"), 'visites')
const apiRequests = mongoose.model('apiRequests', require("../../models/Visite"), 'apiRequests')

module.exports = (req, res) => {

    let days = 60

    let stats = {}

    stats.totalValidate = getTotalValidate()

    stats.totalValidate = getTotalWaiting()

    stats.totalValidate = getTotalTags()

    stats.totalValidate = getVisitesGraph(days)

    stats.totalValidate = getApiRequestsGraph()

    return stats

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

function getVisitesGraph (days) {

    let now = new Date().getTime()

    return visites.find().exec((err, results) => results.filter(res => now - res.createdAt.getTime() < days * 24 * 60 * 60 * 1000))

}

function getVisitesGraph (days) {

    let now = new Date().getTime()

    return apiRequests.find().exec((err, results) => results.filter(res => now - res.createdAt.getTime() < days * 24 * 60 * 60 * 1000))

}

