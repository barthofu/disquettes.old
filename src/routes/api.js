const express                                   = require('express'),
      notFound                                  = require('../utils/404'),

      authLoggedIn                              = require('../middleware/auth/authLoggedIn'),

      post                                      = require('../controllers/api/post'),
      get                                       = require('../controllers/api/get'),
      validate                                  = require('../controllers/api/validate'),
      deleteDisquette                           = require('../controllers/api/delete'),
      getListWaiting                            = require('../controllers/api/getWaiting.js'),
      getListValidate                           = require('../controllers/api/getValidate.js'),

      { validateDisquette, waitingDisquette }   = require('../models/Disquette')

let router = express.Router();

router
    .post('/post', authLoggedIn(), post)
    .post('/list/update/validate', authLoggedIn(),(req, res) =>{

        console.log(req.body.data)

        validateDisquette.findOneAndUpdate({_id: req.body.data._id}, {$set: req.body.data}, { }).then(result=>{
            console.log(result)
            res.json({
                status: "success",
                message: "Disquette added to database",
                data: result
            })
        }).catch(err =>{
            console.log(err)
            res.json({
                status: "error",
                message: "Error on insertion",
                details: err
            })
        })
    }) 

    .get('/get', get)
    //.get('/waiting', authLoggedIn(), getWaiting)
    .get('/list/waiting', authLoggedIn(), getListWaiting)

    .get('/list/validate', authLoggedIn(), getListValidate)

    .post('/validate', authLoggedIn(), validate)
    .post('/delete',authLoggedIn(), deleteDisquette)

    // .get('/disquette/:id',(req, res) =>{
       
    //     console.log(req.params.id)
    //     validateDisquette.findById(req.params.id).then(result => {

    //         res.json(result)
    //     }).catch(err =>{

    //         res.json({
    //             status: 'error',
    //             message: `Disquette with id ${req.params.id} not found`,
    //         })
    //     })
    
    // })


    .get(notFound)

module.exports = router;