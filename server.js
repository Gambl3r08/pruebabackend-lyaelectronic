//Imports
const express = require('express')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const mongo = require('mongodb')
const config = require('./configs/config')


const app = express()

app.set('llave', config.llave)
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

const PORT = 30000
app.listen(PORT, ()=>{
    console.log("localhost:", PORT)
})

//Basic routers

app.post('/users', (req, res)=>{

})

app.put('/users', (req, res)=>{

})

app.delete('/users', (req, res)=>{

})

app.path('/users', (req, res)=>{

})

app.get('/users', ()=>{

})


app.post('/authorization', (req, res)=>{

})

app.delete('/authorization', (req, res)=>{

})

app.post('/messages/send', ()=>{

})

