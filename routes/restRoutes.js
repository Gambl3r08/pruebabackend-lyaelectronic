require('../dbmanager/DBmanager')
const {Router} = require('express')
const router = Router()
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const bodyParser = require('body-parser')
const { llave } = require('../configs/config')
const mqttHandler = require('../mqtt/mqtt_handler')
const axios = require('axios').default;




let mqttClient = new mqttHandler()
mqttClient.connect()


router.use(bodyParser.urlencoded({extended: false}))
router.use(bodyParser.json())

/**
 * @swagger
 * /users:
 *   post:
 *     description:  Crea un usuario.
 *     parameters:
 *       - name: username
 *         in: body
 *         require: false
 *         schema:
 *          - type: string
 *         description: Nombre de usuario.
 *     responses:
 *       201:
 *         description:  retorna el id del usuario creado
 *       500:
 *         description: retorna un error
 *          
 */
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

/**
 * @swagger
 * /users/:id:
 *   put:
 *     description:  Actualiza un usuario.
 *     parameters:
 *       - name: id
 *         in: params
 *         require: false
 *         schema:
 *          - type: string
 *         description: Id de usuario.
 *       - name: name
 *         in: body
 *         require: false
 *         schema:
 *          - type: string
 *         description: Nombre de usuario.
 *       - name: active
 *         in: body
 *         require: false
 *         schema:
 *          - type: boolean
 *         description: Estado de usuario.
 * 
 *     responses:
 *       200:
 *         description:  retorna mensaje de confirmación
 *       500:
 *         description: retorna un error
 *          
 */

router.put('/users/:id', async ( req, res)=>{
    try{
        
        const {id} = req.params
        const resuldID = await User.findById(id)
        if(resuldID){
            const {name, active} = req.body
            const userUpdate = await User.findOneAndUpdate({'_id':id}, {
                'name': name,
                'active': active
            })
            res.status(200).send('Usuario actualizado')
        }

    } catch(err){
        res.status(500).send(err.message)
    }

})



/**
 * @swagger
 * /users/:id:
 *   delete:
 *     description:  Elimina un usuario.
 *     parameters:
 *       - name: id
 *         in: paramns
 *         require: false
 *         schema:
 *          - type: string
 *         description: Id de usuario.
 *     responses:
 *       200:
 *         description:  retorna mensaje de confirmación
 *       500:
 *         description: retorna un error
 *          
 */


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
        res.status(500).send(err.message)
    }

})


/**
 * @swagger
 * /users/:id/active:
 *   patch:
 *     description:  Actualiza el estado de un usuario.
 *     parameters:
 *       - name: id
 *         in: paramns
 *         require: false
 *         schema:
 *          - type: string
 *         description: Id de usuario.
 *     responses:
 *       201:
 *         description:  retorna mensaje de confirmación
 *       500:
 *         description: retorna un error
 *          
 */


router.patch('/users/:id/active', async (req, res)=>{
    try{
        const {id} = req.params
        const resuldID = await User.findById(id)
        if (resuldID){
            const userUpdate = await User.findOneAndUpdate({'_id': id}, {'active':true}, {new:true})
            res.status(201).send('usuario activado')
        }

    } catch(err){
        res.status(500).send(err.message)
    }
    
})


/**
 * @swagger
 * /users/:id:
 *   get:
 *     description:  retorna información un usuario.
 *     parameters:
 *       - name: id
 *         in: paramns
 *         require: false
 *         schema:
 *          - type: string
 *         description: Id de usuario.
 *     responses:
 *       200:
 *         description:  retorna mensaje de confirmación
 *       500:
 *         description: retorna un error
 *          
 */

router.get('/users/:id', async (req, res)=>{
    try{
        const {id} = req.params
        const resuldID = await User.findById(id)
        if(resuldID){
            res.status(200).send({resuldID})
        }
    } catch(err){
        res.status(500).send(err.message)
    }
})


/**
 * @swagger
 * /authorization:
 *   post:
 *     description:  retorna un token de usuario.
 *     parameters:
 *       - name: _id
 *         in: body
 *         require: false
 *         schema:
 *          - type: string
 *         description: Id de usuario.
 *     responses:
 *       200:
 *         description:  retorna mensaje de confirmación
 *       500:
 *         description: retorna un error
 *          
 */



router.post('/authorization', async (req, res)=>{
    try{
        const {_id} = req.body
        const resuldID = await User.findById(_id)
        const token = resuldID.token
        if(resuldID){
            res.status(200).send({token})
        }

    } catch(err){
        res.status(500).send(err.message)
    }
})


/**
 * @swagger
 * /authorization:
 *   delete:
 *     description:  borra un token de usuario.
 *     parameters:
 *       - name: _id
 *         in: body
 *         require: false
 *         schema:
 *          - type: string
 *         description: Id de usuario.
 *     responses:
 *       200:
 *         description:  retorna mensaje de confirmación
 *       500:
 *         description: retorna un error
 *          
 */

router.delete('/authorization', async (req, res)=>{
    try{
        const {_id} = req.body
        const resuldID = await User.findById(_id)
        const token = resuldID.token
        if(resuldID){
            const deleteToken = await User.findByIdAndUpdate({'_id':_id}, {
                'token': null
            }) 
            res.status(200).send({message: "Token eliminado"})
        }

    } catch(err){
        res.status(500).send(err.message)
    }
})


/**
 * @swagger
 * /authorization:
 *   post:
 *     description:  consume una api y guarda un mensaje, luego envia ese mensaje más un id a un broker mqtt. 
 *     parameters:
 *       - name: _id
 *         in: body
 *         require: false
 *         schema:
 *          - type: string
 *         description: Id de usuario.
 *     responses:
 *       200:
 *         description:  retorna mensaje de confirmación
 *       500:
 *         description: retorna un error
 *          
 */

router.post('/messages/send', async (req, res)=>{
    try{
        const {_id} = req.body
        const rescat = await axios.get('https://catfact.ninja/facts', {params: {data:0}})
        const message =  rescat.data.data[0].fact
        
        await mqttClient.sendMessage(_id, message)
        res.status(200).send('Mensaje enviado correctamente')
    }catch(err){
        res.status(500).send(err.message)
    }
})


module.exports = router