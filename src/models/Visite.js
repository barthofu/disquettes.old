const mongoose = require("mongoose")

module.exports = mongoose.Schema({

    ip: { type: String, default: "0.0.0.0" },
    createdAt: { type: Date, default: new Date() },
    country: { type: String, default: "unknown" },
    url: { type: String, default: "/" },
    fromUrl: { type: String },
    agent: { type: String }

}, {
    versionKey: false
});