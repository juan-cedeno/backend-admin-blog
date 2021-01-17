
const {Schema , model} = require('mongoose')

const courseSchema = new Schema({

    name : {
        type : String,
        required : true
    },

    image : String,  

    difficulty : {
        type: String,
        required : true
    },

    link : {
        type : String,
        required : true
    },

    price : {
        type : Number,
        required : true
    }
})

module.exports = model('Course' , courseSchema)