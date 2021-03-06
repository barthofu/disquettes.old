const mongoose = require('mongoose')
const Disquette = mongoose.model('waiting', require("../../models/Disquette"), 'waiting')

module.exports = (querry = {disquette, tags, author: "Annonymous", age: 0, lang: "FR" }) => {


    //if (!querry.disquette || !querry.tags) return Error()


        let disquette = new Disquette(querry)
        disquette.save(e => {
            if (e) {
            
                return new Error(e);

            }else {
                console.log("insertion successful")
                return disquette
            }
        })

}

function makeError(e) {



    
    console.log("insertion error: " )
 


    //throw new(e)
 //   return {error: {name: "error", message: e}}
}