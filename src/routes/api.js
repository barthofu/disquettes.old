const express                                   = require('express'),
      notFound                                  = require('../utils/404'),

      authLoggedIn                              = require('../middleware/auth/authLoggedIn'),

      post                                      = require('../controllers/api/post'),
      get                                       = require('../controllers/api/get'),
      validate                                  = require('../controllers/api/validate'),
      deleteDisquette                           = require('../controllers/api/delete'),

      { validateDisquette, waitingDisquette }   = require('../models/Disquette')

let router = express.Router();

router
    .post('/post', authLoggedIn(), post)

    .get('/get', get)

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