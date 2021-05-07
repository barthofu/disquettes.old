const mongoose = require('mongoose'),
	dateFormat = require('dateformat'),
	{ waitingDisquette, validateDisquette } = require('../../models/Disquette'),
	visites = mongoose.model(
		'visits',
		require('../../models/Visite'),
		'visits'
	),
	apiRequests = mongoose.model(
		'apiRequests',
		require('../../models/Visite'),
		'apiRequests'
	);

module.exports = async (req, res, next) => {
	let days = 60;

	req.args = {};

	req.args.totalValidate = await getTotalValidate();

	req.args.totalWaiting = await getTotalWaiting();

	req.args.totalTags = await getTotalTags();

	req.args.totalVisites = await getTotalVisites(days);

	req.args.totalApiRequests = await getTotalApiRequests(days);

	req.args.requests = await getRequests(days);

	next();
};

async function getRequests(days) {
	let now = new Date().getTime();

	return {
		api: (await apiRequests.find().select({ createdAt: 1 }).exec())
			.filter(
				(res) =>
					now - res.createdAt.getTime() < days * 24 * 60 * 60 * 1000
			)
			.map((res) => dateFormat(res.createdAt, 'dd/mm')),

		visites: (await visites.find().select({ createdAt: 1 }).exec())
			.filter(
				(res) =>
					now - res.createdAt.getTime() < days * 24 * 60 * 60 * 1000
			)
			.map((res) => dateFormat(res.createdAt, 'dd/mm')),
	};
}

async function getTotalValidate() {
	return (await validateDisquette.find().exec()).length;
}

async function getTotalWaiting() {
	return (await waitingDisquette.find().exec()).length;
}

async function getTotalTags() {
	let results = await validateDisquette.find().exec();

	return [...new Set(results.map((res) => res.tags).flatMap((res) => res))]
		.length;
}

async function getTotalVisites(days) {
	let now = new Date().getTime();

	let results = await visites.find().exec();

	return results.filter(
		(res) => now - res.createdAt.getTime() < days * 24 * 60 * 60 * 1000
	).length;
}

async function getTotalApiRequests(days) {
	let now = new Date().getTime();

	let results = await apiRequests.find().exec();

	return results.filter(
		(res) => now - res.createdAt.getTime() < days * 24 * 60 * 60 * 1000
	).length;
}
