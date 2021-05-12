const mongoose = require('mongoose'),
	geoip = require('geoip-lite'),
	apiRequests = mongoose.model(
		'apiRequests',
		require('../../models/Visite'),
		'apiRequests'
	);

module.exports = (req, res, next) => {
	let ip =
		req.headers['x-forwarded-for'] ||
		req.connection.remoteAddress ||
		console.log(ip);
	const defaultIp = ['::1', '::ffff:127.0.0.1', '127.0.0.1', null];

	if (ip in defaultIp) ip = '0.0.0.0';
	let country = geoip.lookup(ip)?.country || 'NA';

	new apiRequests({
		ip,
		createdAt: new Date(),
		country: country,
		url: req.path,
		agent: req.headers['user-agent'],
	})
		.save()
		.then(() => {
			next();
		})
		.catch((err) => {
			console.log(err);
			next();
		});
};
