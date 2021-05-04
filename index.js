const app = require('./src/app');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 4000;


const config = require('./.credentials.json');

mongoose
	.connect(require('mongodb-uri').format(config.db), {
		keepAlive: 1,
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log('connected to mongoDB!');
		mongoose.set('useFindAndModify', false);

		app.listen(PORT, () => {
			console.log('server started ➜ localhost:4000');
		});
	});
