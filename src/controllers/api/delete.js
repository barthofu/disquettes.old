const mongoose                                  = require('mongoose'),

      { waitingDisquette, validateDisquette, disquetteSchema }   = require('../../models/Disquette')

module.exports = (req, res) => {

    req.body.type = req.body.type || "waiting"
    let type = "waiting"
    if(req.body.type == "validate") type = "validate" 


    mongoose.model(type, disquetteSchema, type).findByIdAndDelete(req.body.id).then(result => {

            
        result = result?.toJSON()
        if (!result){ return res.json({
            status: 'error',
            message: `Disquette with id ${req.body.id} not found`,
        })}
        else{
            return res.json({
                status: 'success',
                message: `Disquette with id ${req.body.id} removed`,
        })
    }
    })
}