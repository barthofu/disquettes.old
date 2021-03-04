const mongoose = require("mongoose")

module.exports = mongoose.Schema({

    disquette: [{ type: String, required: true }],
    author: { type: String, required: true },
    genre: { type: Number, default: 2 },
    age: { type: Number },
    lang: { type: String, default: "FR" },
    tags: [{ type: String, default: [] }],
    votes: {
        up: { type: Number, default: 0 },
        down: { type: Number, default: 0 }
    },
    stats: {
        spawned: [{ type: Date }],
    },
    submittedAt: { type: Date, default: new Date() }

}, {
    timestamps: true,
    versionKey: false
});