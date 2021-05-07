module.exports = function (options) {
	if (typeof options == 'string') options = { redirectTo: options };

	options = options || {};

	let url = options.redirectTo || '/';

	return function (req, res, next) {
		if (req.isAuthenticated && req.isAuthenticated())
			return res.redirect(url);
		next();
	};
};
