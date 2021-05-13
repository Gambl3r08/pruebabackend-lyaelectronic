const swaggerDefinition = {
    swaggerDefinition:{
        openapi: "3.0.0",
        info:{
            title: "Prueba bakcend Lya electronic",
            description: "Documentación de la api"            
        },
        host: "localhost:3000",
        basePath: '/',
    },
    apis: ['./routes/restRoutes.js', './models/user.js']
}

module.exports = swaggerDefinition