const express = require('express'),
	getTags = require('../middleware/data/getTags'),
	visitsCounter = require('../middleware/counter/visitsCounter')

let router = express.Router();

router.get('/', visitsCounter, getTags, (req, res) =>
	res.render('index', { tags: req.tags })
);

module.exports = router;
