require('dotenv').config()
const express = require('express')

require('./dbmanager/DBmanager')
const app = express()

app.use(require('./routes/restRoutes'))


const PORT = 3000
app.listen(PORT, ()=>{
    console.log("Server localhost:", PORT)
})