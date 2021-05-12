require('../dbmanager/DBmanager')
const {Router} = require('express')
const router = Router()
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const bodyParser = require('body-parser')



router.use(bodyParser.urlencoded({extended: false}))
router.use(bodyParser.json())



router.post('/users', (req, res)=>{
    try{
        let user = User({
            name: req.body.username,
            active: false,
            token: "token"
        })
        userStored = user.save()

        res.status(201).send({ success: userStored })
    } catch(err){
        res.status(500).send({message: err.message})
    }
    
})

router.put('/users', (req, res)=>{

})

router.delete('/users', (req, res)=>{

})

router.patch('/users', (req, res)=>{

})

router.get('/users', (req, res)=>{
    res.send('test')    
})


router.post('/authorization', (req, res)=>{

})

router.delete('/authorization', (req, res)=>{

})

router.post('/messages/send', ()=>{

})


module.exports = router