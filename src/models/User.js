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

passwordValidator = function(password,cb) {
    if (password.length < 5) {
      return cb({
            name: 'PasswordValidatorError',
            message: 'Gros donne un mot de passe avec plus de lettre stp'
      })
    }
    // return an empty cb() on success
    return cb()
  }


opt = {
    limitAttempts: 10,
    passwordValidator: passwordValidator
   
}

Account.plugin(passportLocalMongoose, opt);

module.exports = mongoose.model('Account', Account);