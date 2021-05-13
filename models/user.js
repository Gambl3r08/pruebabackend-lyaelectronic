/**
 * @swagger
 *  components:
 *    schemas:
 *      User:
 *        type: object
 *        required:
 *          - name
 *        properties:
 *          name:
 *            type: string
 *          active:
 *            type: boolean   
 *          token:
 *            type: string
 */


const mongoose = require('mongoose')
const Schema = mongoose.Schema


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


module.exports = mongoose.model("User", userSchema)