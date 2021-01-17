
const {Schema , model} = require('mongoose')


const newLettersSchema = new Schema ({

    email : {
        type : String,
        required : true
    }
})

module.exports = model('NewLetters' , newLettersSchema)