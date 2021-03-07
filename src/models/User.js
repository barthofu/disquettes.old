const mongoose              = require("mongoose"),
      Schema                = mongoose.Schema,
      passportLocalMongoose = require('passport-local-mongoose');

const Account = new Schema(
    
    {
        username: { type: String, required: true },
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        mail: { type: String, required: true },
        age: { type: Number },
        sexe: { type: String },
        lang: { type: String, default: "FR" },
        roles: {
            user: { type: Boolean, default: true },
            modo: { type: Boolean, default: false },
            admin: { type: Boolean, default: false }
        },
        stats: {
            submit: { type: Number },
            approve: { type: Number },
            remove: { type: Number }
        },
        createdAt: { type: Date, default: new Date() }

    }, {
        timestamps: true,
        versionKey: false
    }
);

Account.plugin(passportLocalMongoose);

module.exports = mongoose.model('Account', Account);