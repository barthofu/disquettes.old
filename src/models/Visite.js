const mongoose = require('mongoose');

let schema = mongoose.Schema(
	{
		ip: { type: String, default: '0.0.0.0' },
		createdAt: { type: Date, default: new Date() },
		country: { type: String, default: 'unknown' },
		url: { type: String, default: '/' },
		fromUrl: { type: String },
		agent: { type: String, default: 'unknown' },
	},
	{
		versionKey: false,
	}
);

schema.statics.checkUser = async function (ip, url, minutes = 10) {
	let results = await this.find({ ip, url }).exec();

	return (
		results.filter(
			(e) =>
				new Date(e.createdAt).getTime() + minutes * 60 * 1000 >
				new Date().getTime()
		).length === 0
	);
};

module.exports = schema;
