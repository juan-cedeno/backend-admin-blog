const express = require('express')
const { check } = require('express-validator')
const { createUser , loginUser , renewTokenController } = require('../controllers/user')
const { renewToken } = require('../middleware/renew-token')
const {validateCamp} = require('../middleware/validate-camp')


let routers = express.Router()

routers.post('/register',

[
    check('name' , 'name is required').not().isEmpty(),
    check('email' , 'Email is required').not().isEmpty(),
    check('email' , 'Email not valid').isEmail(),
    check('password' , 'Password is required').not().isEmpty(),
    check('password' , 'Password must be 6 characters').isLength({min: 6}),
    validateCamp
    
]
 , createUser)

 routers.post('/login' , 
 [
    check('email' , 'Email is required').not().isEmpty(),
    check('email' , 'Email not valid').isEmail(),
    check('password' , 'Password is required').not().isEmpty(),
    validateCamp
 ],
 loginUser
 )

 routers.get('/renew' , renewToken , renewTokenController)

module.exports = routers