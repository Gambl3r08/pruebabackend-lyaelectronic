const mongoose = require('mongoose')

const MONGODB_URI = process.env.DATABASE
mongoose.connect(MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
}).then(db => console.log("Database is connected"))
   .catch(err => console.log(err))

