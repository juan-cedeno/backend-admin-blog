const { request, response } = require("express");
const { validationResult } = require("express-validator");


const validateCamp = (req = request , res = response , next) => {

    const errors = validationResult(req)

    if(!errors.isEmpty()) {
        res.json({
            ok : false,
            message : errors.array()[0].msg
        })
    }

    next()
}

module.exports = {
    validateCamp
}