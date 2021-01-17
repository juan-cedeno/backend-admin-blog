

const express = require('express')
const { check } = require('express-validator')
const { createNewLetters } = require('../controllers/newLetters')
const { validateCamp } = require('../middleware/validate-camp')

const routers = express.Router()

routers.post('/new-letters' ,
[
    check('email' , 'Email is required').not().isEmpty(),
    check('email' , 'Email not valid').isEmail(),
    validateCamp
]
 , createNewLetters )

 module.exports = routers