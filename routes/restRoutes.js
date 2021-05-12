require('../dbmanager/DBmanager')
const {Router} = require('express')
const router = Router()
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const bodyParser = require('body-parser')
const { llave } = require('../configs/config')


router.use(bodyParser.urlencoded({extended: false}))
router.use(bodyParser.json())



router.post('/users', async (req, res)=>{
    try{
        const payload ={
            check: true
        }

        var user = new User({
            name: req.body.username,
            token: jwt.sign(payload, llave, {
                expiresIn: 1440
            })
        })
        const newuser = await  user.save()
        const id = newuser._id
        res.status(201).send({ id })
    } catch(err){
        res.status(500).send({message: err.message})
    }
    
})

router.put('/users', (req, res)=>{

})

router.delete('/users/:id', async (req, res)=>{
    try{
        const {id} = req.params
        const resuldID = await User.findById(id)
        if(resuldID){
            const userDelete= await User.findOneAndDelete({'_id':id}, (err)=>{
                if(err) res.status(400).send({message: err})
            })
            res.status(200).send("usuario eliminado")
        }

    } catch(err){
        res.send(err.message)
    }

})

router.patch('/users/:id/active', async (req, res)=>{
    try{
        const {id} = req.params
        const resuldID = await User.findById(id)
        if (resuldID){
            const userUpdate = await User.findOneAndUpdate({'_id': id}, {'active':true}, {new:true})
            res.send(userUpdate)
        }

    } catch(err){
        res.send(err.message)
    }
    
})

router.get('/users', (req, res)=>{
    res.send("askjfkalsjf")
})


router.post('/authorization', (req, res)=>{
    
})

router.delete('/authorization', (req, res)=>{

})

router.post('/messages/send', ()=>{

})


module.exports = router