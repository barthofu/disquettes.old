const mongoose = require("mongoose")

const disquetteSchema = mongoose.Schema({

    disquette: { type: Array, required: true },
    author: { type: String, required: true },
    genre: { type: Number, default: 2 },
    age: { type: Number },
    tags: { type: Array, default: [] },
    accessible: { type: Boolean, default: true },

}, {
    timestamps: true,
    versionKey: false
});

module.exports = disquetteSchema