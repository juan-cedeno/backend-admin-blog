const { request, response } = require("express");
const User = require('../models/users')
const bcrypt = require('bcrypt')
const {generalToken} = require('../helpers/jwt')
const gravatar = require('gravatar')

const createUser = async (req = request , res = response) => {

    try {
        
        const {name , email , password} = req.body

        let user = await User.findOne({email})

        if(user) {
            return res.status(401).json({
                ok : false,
                message : 'Email alredy use'

            })
        }

        user = new User(req.body)
        user.avatar = gravatar.url(email ,{
            s : '200',
            r : 'pg',
            d : 'mm'
        }) 
        
        const salt = bcrypt.genSaltSync()
        user.password = bcrypt.hashSync(password , salt)

        const token = await generalToken(user.id , user.name)

        await user.save() 

        res.status(200).json({
            ok : true,
            id : user.id,
            name : user.name,
            email : user.email,
            token
        })
        

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok : false,
            message : 'Comuniquese con soporte tecnico'
        })
    }

}

const loginUser = async (req = request , res = response) => {

    try {
        const {email , password} = req.body
        const user = await User.findOne({email})
        if(!user) {
            return res.status(404).json({
                ok : false,
                message : 'Password or email incorrect'
            })
        }

        const validPassword = bcrypt.compareSync(password , user.password)
        if(!validPassword) {
            return res.status(404).json({
                ok : false,
                message : 'Password or email incorrect'
            })
        }
        const token = await generalToken(user.id ,user.name)

        res.status(200).json({
            ok : true,
            id: user.id,
            email : user.email,
            name : user.name,
            token 

        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok : false,
            message : 'Comuniquese con soporte tecnico'
        })
    }

}

const renewTokenController = async (req = request , res = response) => {

    try {
        
        const name = req.name
        const id = req.id

        const token = await generalToken(id , name)

        res.status(200).json({
            ok : true,
            id,
            name,
            token
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
    createUser,
    loginUser,
    renewTokenController
}