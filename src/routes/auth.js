const express = require('express'),
	notFound = require('../utils/404'),
	authLoggedOut = require('../middleware/auth/authLoggedOut'),
	// register              = require('../middleware/auth/register'),

	login = require('../controllers/auth/login');
register = require('../controllers/auth/register');

let router = express.Router();

router
	.get(['/', '/login'], authLoggedOut('/'), (res, req) =>
		req.render('auth/layout', { page: 'login' })
	)
	.post('/login', authLoggedOut('/'), login)

	.get('/reset', (res, req) => req.render('auth/layout', { page: 'reset' }))
	.get('/logout', (req, res) => {
		req.logout();
		res.redirect('/');
	})

	.get('/register', authLoggedOut('/'), (res, req) =>
		req.render('auth/layout', { page: 'register' })
	)
	.post('/register', authLoggedOut('/'), register)
	.get('/info', (req, res) => {
		console.log(req.session);
		res.json(req);
	})

	.get(notFound);

module.exports = router;
