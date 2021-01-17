const { request, response } = require("express");
const User = require('../models/users')
const bcrypt = require('bcrypt')
const gravatar = require('gravatar')

const getUserBlog = async (req = request , res = response ) => {

    try {
        
        const user = await User.find()

        if(!user) {
            return res.status(404).json({
                ok : false,
                message : 'no users'
            })
        }

        res.status(200).json({
            ok : true,
            user
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok : false,
            message : 'Comuniquese con soporte tecnico'
        })
    }
}

const createUserBlog = async (req = request , res = response) => {
    try {
        const {name , email , password} = req.body

        let user = await User.findOne({email})

        if(user) {
            return res.json({
                ok : false,
                message : 'Email alredy user'
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
        await user.save() 

        res.status(200).json({
            ok : true,
            id : user.id,
            name : user.name,
            email : user.email,
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok : false,
            message : 'Comuniquese con soporte tecnico'
        })
    }
}

const editUserBlog = async (req = request , res = response) => {

    const {id} = req.params
    try {

        const userId = await User.findById(id)

        if(!userId) {
            return res.status(404).json({
                ok : false,
                message : 'no id'
            })
        }

        const newUser = (req.body)
        const userUpdate = await User.findByIdAndUpdate(id , newUser , {new : true})

        res.status(200).json({
            ok : true,
            user : userUpdate
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok : false,
            message : 'Comuniquese con soporte tecnico'
        })
    }
}

const deleteUser = async (req = request , res = response) => {
    try {
        const {id} = req.params

        const userId = await User.findById(id)

        if(!userId) {
            return res.status(404).json({
                ok : false,
                message : 'not id'
            })
        }

        await User.findByIdAndRemove(id)

        res.status(200).json({
            ok : true
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
    getUserBlog,
    editUserBlog,
    createUserBlog,
    deleteUser
}