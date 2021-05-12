//Imports
require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const config = require('./configs/config')
require('./dbmanager/DBmanager')
const app = express()

app.set('llave', config.llave)
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(require('./routes/restRoutes'))


app.path('/users', (req, res)=>{

})


const PORT = 3000
app.listen(PORT, ()=>{
    console.log("Server localhost:", PORT)
})