const mongoose = require('mongoose')
require('../models/user')

const MONGODB_URI = process.env.DATABASE
mongoose.connect(MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
}).then(db => console.log("Database is connected"))
   .catch(err => console.log(err))

