const app = require('./src/app');
const mongoose = require('mongoose');
require('dotenv').config();
const PORT = process.env.PORT || 4000;
const MONGOOSE_URL = process.env.MONGOOSE_URL;
const MONGOOSE_PORT = process.env.MONGOOSE_PORT;
const MONGOOSE_USERNAME = process.env.MONGOOSE_USERNAME;
const MONGOOSE_PASSWORD = process.env.MONGOOSE_PASSWORD;
const MONGOOSE_DATABASE = process.env.MONGOOSE_DATABASE;

const config = {
	username: MONGOOSE_USERNAME,
	password: MONGOOSE_PASSWORD,
	hosts: [
		{
			host: MONGOOSE_URL,
			port: MONGOOSE_PORT,
		},
	],
	database: MONGOOSE_DATABASE,
	options: {
		authSource: 'admin',
	},
};
mongoose
	.connect(require('mongodb-uri').format(config), {
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
