require('dotenv').config()
const express = require('express')
const swaggerJSDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')
const swaggerConfig = require('./swaggerConfig.js')

const swaggerDocument = swaggerJSDoc(swaggerConfig)



require('./dbmanager/DBmanager')
const app = express()

app.use(require('./routes/restRoutes'))
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

const PORT = 3000
app.listen(PORT, ()=>{
    console.log("Server localhost:", PORT)
})