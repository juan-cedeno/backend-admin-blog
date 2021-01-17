
const {Schema , model} = require('mongoose')

const blogSchema = new Schema({
    name : {
        type : String,
        required : true
    },
    url : {
        type : String,
        required : true
    },
    author : String

})

module.exports = model('Blog' , blogSchema)