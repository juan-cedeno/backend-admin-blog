const { request, response } = require("express");
const jwt = require('jsonwebtoken')


const renewToken = (req = request , res = response , next) => {

    try {
        const token = req.header('x-token')

        if(!token) {
            return res.status(404).json({
                ok : false,
                message : 'no token'
            })
        }

        const {id , name} = jwt.verify(token , process.env.JWT_KEY)
        req.id = id
        req.name = name

    } catch (error) {
        console.log(error);
        res.json({
            ok : false,
            msg : 'token no valid'
        })
    }
    next()

}
module.exports = {
    renewToken
}