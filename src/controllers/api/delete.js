const mongoose                                  = require('mongoose'),

      { waitingDisquette, validateDisquette }   = require('../../models/Disquette')


module.exports = (req, res) => {

    waitingDisquette.findByIdAndDelete(req.body.id).then(result => {

       
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