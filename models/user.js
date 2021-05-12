const {Schema, model} = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('../configs/config')
const { llave } = require('../configs/config')
require('../configs/config')



const userSchema =  new Schema(
    {
        name:{
            type: String,
            required: true,
            minlength: 5
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

userSchema.methods.GenerateToken = async function (username){
    if(true){ //Luego valido
        const payload ={
            check: true
        }
        const token = jwt.sign(payload, llave, {
            expiresIn: 1440
        })
        return token
    }
}


userSchema.methods.encrypToken = async function(Token){
    
    return await bcrypt.hash(Token, bcrypt.getSalt(10))
}

userSchema.methods.matchToken = async function (Token) {
    return await bcrypt.compare(Token, this.token)
}





const User = model('User', userSchema)
module.exports = {User}