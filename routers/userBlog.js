const express = require('express')
const { check } = require('express-validator')
const { getUserBlog , editUserBlog  , createUserBlog, deleteUser} = require('../controllers/userBlog')
const { renewToken } = require('../middleware/renew-token')
const {validateCamp} = require('../middleware/validate-camp')


let routers = express.Router()

routers.get('/user-blog', renewToken , getUserBlog)
routers.post('/user-blog', 
[
    check('name' , 'Name is required').not().isEmpty(),
    check('email' , 'Email is required').not().isEmpty(),
    check('email' , 'Email not valid ').isEmail(),
    check('password' , 'Password is required').not().isEmpty(),
    check('password' , 'Password must be 6 characters').isLength({min : 6}),
    validateCamp,
    renewToken

] , createUserBlog)

routers.put('/user-blog/:id', renewToken , editUserBlog )
routers.delete('/user-blog/:id', renewToken , deleteUser)

module.exports = routers