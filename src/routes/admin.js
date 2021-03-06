const express = require('express');
const notFound = require('../utils/404')

const getStats = require('../controllers/admin/stats')
const checkUser = require('../controllers/admin/checkUser')
const showDashboard = require('../controllers/admin/showDashboard')
const postDisquette = require('../controllers/db/post')
const authLoggedIn = require('../middleware/authLoggedIn')

const postDisq = require('../services/db/post')
let router = express.Router()

router
    .get('/', (req, res) => res.redirect('/admin/overview'))

.get('/overview', authLoggedIn(), getStats, showDashboard)
    .get('/list', authLoggedIn(), showDashboard)
    .get('/waiting', authLoggedIn(), showDashboard)
    .get('/submit', authLoggedIn(), showDashboard)
    .post('/submit', authLoggedIn(), (req, res, next) => {

        req.body.tags = req.body.tag
        if(!req.body.author)
        {
            req?.user?.username ? req.body.author = req.user.username : req.body.author = "Annonymous"
        }


            
        try {
            postDisq(req.body)
            res.send("ok")
        } catch (error) {
            
            console.log(error)
            res.send(error)
        }
          

       
            
            //console.log(error)
        


       // next()
    },postDisquette,
    
    (req, res, next )=>{
    
        
    

        if(res.locals.error){
          //  console.log("Une erreur est survenue" + res.locals.error)
        }else{
        res.redirect('/admin/submit')
        }
    })

.get(notFound)

module.exports = router;