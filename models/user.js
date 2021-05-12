const {Schema, model} = require('mongoose')
const bcrypt = require('bcryptjs')
const userSchema =  new Schema(
    {
        id:{
            type: Number,
            unique: true,
            index: true
        },
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
            type: String
        }
    }
)

userSchema.methods.encrypToken = async Token =>{
    await const salt = bcrypt.getSalt(10)
    return await bcrypt.hash(Token, salt)
}

userSchema.methods.matchToken = async function (Token) {
    return await bcrypt.compare(Token, this.token)
}



const User = model('User', userSchema)
module.exports = {User}