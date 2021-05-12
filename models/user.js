const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('../configs/config')
const { llave } = require('../configs/config')
require('../configs/config')


const userSchema =  new Schema(
    {
        
        name:{
            type: String,
            required: true
        },
        active:{
            type: Boolean,
            default: false
        },
        token: {
            type: String,
            required: false
        }
    }
)


userSchema.methods.encrypToken = async function(Token){
    
    return await bcrypt.hash(Token, bcrypt.getSalt(10))
}

userSchema.methods.matchToken = async function (Token) {
    return await bcrypt.compare(Token, this.token)
}



module.exports = mongoose.model("User", userSchema)