const express = require('express'),
	notFound = require('../utils/404'),
	authLoggedIn = require('../middleware/auth/authLoggedIn'),
	apiRequestsCounter = require('../middleware/counter/apiCounter'),
	post = require('../controllers/api/post'),
	get = require('../controllers/api/get'),
	validate = require('../controllers/api/validate'),
	deleteDisquette = require('../controllers/api/delete'),
	getListWaiting = require('../controllers/api/getWaiting.js'),
	getListValidate = require('../controllers/api/getValidate.js'),
	{ validateDisquette } = require('../models/Disquette');
const apiCounter = require('../middleware/counter/apiCounter');
const getTags = require('../middleware/data/getTags');

let router = express.Router();

router
	.post('/post', authLoggedIn(), apiRequestsCounter, post)
	.post('/list/update/validate', authLoggedIn(), (req, res) => {
		validateDisquette
			.findOneAndUpdate(
				{ _id: req.body.data._id },
				{ $set: req.body.data },
				{}
			)
			.then((result) => {
				res.json({
					status: 'success',
					message: 'Disquette added to database',
					data: result,
				});
			})
			.catch((err) => {
				console.log(err);
				res.json({
					status: 'error',
					message: 'Error on insertion',
					details: err,
				});
			});
	})

	.get('/get/:id?', apiRequestsCounter, get)
	//.get('/waiting', authLoggedIn(), getWaiting)
	.get('/list/waiting', authLoggedIn(), getListWaiting)

	.get('/list/validate', authLoggedIn(), getListValidate)

	.post('/validate', apiRequestsCounter, authLoggedIn(), validate)
	.post('/delete', apiRequestsCounter, authLoggedIn(), deleteDisquette)

	.get('/tags', apiRequestsCounter, getTags, (req, res) => {
		res.json(req.tags);
	})
	.get('/test', apiCounter, (req, res) => {
		console.log(req.user);
		res.json(req.cookies);
	})

	.get(notFound);

module.exports = router;
