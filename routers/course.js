
const express = require('express')
const { check } = require('express-validator')
const { createCourse, getCourse , deleteCourse , updateCouser} = require('../controllers/course')
const {renewToken} = require('../middleware/renew-token')
const { validateCamp } = require('../middleware/validate-camp')


let routers = express.Router()

routers.get('/course' , getCourse)


routers.post('/course',
[
    check('name' , 'Name is required').not().isEmpty(),
    check('difficulty' , 'Difficulty is required').not().isEmpty(),
    check('link' , 'Link is required').not().isEmpty(),
    check('price' , 'Price is required').not().isEmpty(),
    validateCamp,
    renewToken
]
 , createCourse )

 routers.delete('/course/:id', renewToken , deleteCourse)
 routers.put('/course/:id', renewToken , updateCouser )

module.exports = routers