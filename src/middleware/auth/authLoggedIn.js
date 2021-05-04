module.exports = function (options) {
	if (typeof options == 'string') options = { redirectTo: options };

	options = options || {};

	let url = options.redirectTo || '/auth/login';
	let setReturnTo =
		options.setReturnTo === undefined ? true : options.setReturnTo;

	return function (req, res, next) {
		if (!req.isAuthenticated || !req.isAuthenticated()) {
			if (setReturnTo && req.session) {
				req.session.returnTo = req.originalUrl || req.url;
			}
			return res.redirect(url);
		}

		res.locals.user = req.user;
		next();
	};
};
