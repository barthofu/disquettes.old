const { waitingDisquette } = require('../../models/Disquette');

module.exports = (req, res) => {
	if (req.body.author == '' && req.user) req.body.author = req.user.username;

	waitingDisquette
		.post(req.body)
		.then((results) => {
			console.log('insertion succesful');
			req.flash('succes', 'Disquette added to database', results);
			res.redirect('#');
		})
		.catch((err) => {
			req.flash('error', 'Error on insertion', err);
			res.redirect('#');
		});
};
