const mongoose = require('mongoose')

const waitingDisquette = mongoose.model('waiting', require("../../models/Disquette"), 'waiting')
const validateDisquette = mongoose.model('validate', require("../../models/Disquette"), 'validate')
const visites = mongoose.model('visites', require("../../models/Visite"), 'visites')
const apiRequests = mongoose.model('apiRequests', require("../../models/Visite"), 'apiRequests')

module.exports = async (req, res, next) => {

    let days = 60

    req.args = {}

    req.args.totalValidate = await getTotalValidate()

    req.args.totalWaiting = await getTotalWaiting()

    req.args.totalTags = await getTotalTags()

    req.args.totalVisites = await getTotalVisites(days)

    req.args.totalApiRequests = await getTotalApiRequests()

    next()

}

async function getTotalValidate () {

    let results = await validateDisquette.find().exec()

    return results.length

}

async function getTotalWaiting () {

    let results = await waitingDisquette.find().exec()

    return results.length

}

async function getTotalTags () {

    let results = await validateDisquette.find().exec()

    return [...new Set(results.map(res => res.tags).flatMap(res => res))]

}

async function getTotalVisites (days) {

    let now = new Date().getTime()

    let results = await visites.find().exec()

    return results.filter(res => now - res.createdAt.getTime() < days * 24 * 60 * 60 * 1000)

}

async function getTotalApiRequests (days) {

    let now = new Date().getTime()

    let results = await apiRequests.find().exec()

    return results.filter(res => now - res.createdAt.getTime() < days * 24 * 60 * 60 * 1000)

}

