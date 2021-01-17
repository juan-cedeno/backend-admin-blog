const { request, response } = require("express");
const NewLetters = require('../models/newletters')

const createNewLetters = async (req = request , res = response) => {

    try {
        const {email} = req.body

        let user = await NewLetters.findOne({email})

        if (user) {
            return res.status(401).json({
                ok : false,
                message : 'They are already subscribed to the offers'
            })
        }

        user = new NewLetters (req.body) 

        await user.save()

        res.status(201).json({
            ok : true,
            newLetter :  user.email
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok : false,
            message : 'Comuniquese con soporte tecnico'
        })
    }
}



module.exports = {
    createNewLetters
}