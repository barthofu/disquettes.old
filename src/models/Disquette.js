const mongoose = require("mongoose")

const disquetteSchema = mongoose.Schema({

    disquette: [{ type: String, required: true }],
    author: { type: String, required: true },
    genre: { type: Number, default: 2 },
    age: { type: Number },
    tags: [{ type: String, default: [] }],
    votes: {
        up: { type: Number, default: 0 },
        down: { type: Number, default: 0 }
    }

}, {
    timestamps: true,
    versionKey: false
});

module.exports = disquetteSchema