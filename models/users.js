const {Schema , model} = require('mongoose')

 const UserSchema = new Schema({

    name : String,
    
    email : {
        type : String,
        required : true,
        unique : true
    },

    password : {
        type : String,
        required : true
    },

    avatar : String,

    role : {
        type : String,
        default : 'Admin'
    },

    active : {
        type : Boolean,
        default: false  
    }

 })

 module.exports = model('User' , UserSchema)