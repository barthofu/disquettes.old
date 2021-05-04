const { disquetteSchema } = require('../../models/Disquette'),
	mongoose = require('mongoose');

module.exports = (req, res) => {
	req.body.tags = req.body.tag;
	req.body.author = req.user.username || undefined;

	let type = 'waiting';
	if (req.body.type == 'validate') type = 'validate';
	console.log(req.body.data);

	mongoose
		.model(type, disquetteSchema, type)
		.post(req.body.data ? req.body.data : req.body)
		.then((result) => {
			res.json({
				status: 'success',
				message: 'Disquette added to database',
				data: result,
			});
		})
		.catch((err) => {
			res.json({
				status: 'error',
				message: 'Error on insertion',
				details: err,
			});
		});
};
