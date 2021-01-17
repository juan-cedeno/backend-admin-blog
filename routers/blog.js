
const express = require('express')
const { check } = require('express-validator')
const { createBlog , getBlog, editBlog , deleteBlog} = require('../controllers/blog')
const { renewToken } = require('../middleware/renew-token')
const { validateCamp } = require('../middleware/validate-camp')


let routers = express.Router()

routers.get('/blog' , getBlog) 

routers.post ('/blog',
[
    check('name' , 'Name is required').not().isEmpty(),
    check('url' , 'Url is required').not().isEmpty(),
    validateCamp,
    renewToken
]
 , createBlog)

 routers.put ('/blog/:id' , renewToken , editBlog)

 routers.delete ('/blog/:id' , renewToken , deleteBlog)

 
 module.exports = routers