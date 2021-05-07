const mongoose = require('mongoose'),
	geoip = require('geoip-lite'),
	apiRequests = mongoose.model(
		'apiRequests',
		require('../../models/Visite'),
		'apiRequests'
	);

module.exports = (req, res, next) => {
	let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

	if (ip == '::1') ip = null;

	new apiRequests({
		ip,
		createdAt: new Date(),
		country: ip ? geoip.lookup(ip).country : 'unknown',
		url: req.path,
		agent: req.headers['user-agent'],
	})
		.save()
		.then(() => {
			next();
		});
};
