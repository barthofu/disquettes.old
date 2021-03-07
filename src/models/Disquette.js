const mongoose = require("mongoose");
const { options } = require("../app");

const disquetteSchema = mongoose.Schema(

    {
        disquette: [{ type: String, required: true }],
        author: { type: String, default: "Annonymous" },
        genre: { type: Number, default: 0 },
        age: { type: Number, default: 0 },
        lang: { type: String, default: "FR" },
        tags: [{ type: String, default: [], lowercase: true }],
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
    }

);


disquetteSchema.statics.findBy = function (options = {}, pageOptions = {page: 0, limit: 0}) { 
    return this.find(options)
    .skip(pageOptions.page * pageOptions.limit)
    .limit(pageOptions.limit)
    .exec()
}

disquetteSchema.statics.findAll = function (pageOptions = {page: 0, limit: 0}) { 
    return this.find()
    .skip(pageOptions.page * pageOptions.limit)
    .limit(pageOptions.limit)
    .exec()
}

disquetteSchema.statics.post = async function(args) {

    let { disquette, tags, age = 0 } = args
    
    if (!args.disquette) throw "missing disquette"
    if (!args.tags) throw "missing tags"

    args.tags = [].concat(args.tags).map(e => e.toLowerCase())
   
    if(args.age < 0 ||args.age > 3) throw "bad age"
    
    return new this(args).save()
}
   
const validateDisquette = mongoose.model('validate', disquetteSchema, 'validate')
const waitingDisquette = mongoose.model('waiting', disquetteSchema, 'waiting')

module.exports= { validateDisquette, waitingDisquette }