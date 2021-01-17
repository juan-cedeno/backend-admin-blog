const { request, response } = require("express");
const Blog  = require('../models/blog')

const createBlog = async (req = request , res = response) => {

    try {
        const {name , url , date} = req.body

        const blog = new Blog(req.body)

        await blog.save()

        res.status(201).json({
            ok: true,
            blog
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok : false,
            message : 'Comuniquese con soporte tecnico'
        })
    }
}

const getBlog = async (req = request , res = response) => {
    try {

        const blogs = await Blog.find()

        res.status(201).json({
            ok : true,
            blogs
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok : false,
            message : 'Comuniquese con soporte tecnico'
        })
    }
}

const editBlog = async (req = request , res = response) => {
    try {
        
        const {id} = req.params

        const blog = await Blog.findById(id)

        if (!blog) {
            return res.status(404).json({
                ok : false,
                message : 'id no found'
            })
        }

        const newBlog = (req.body)

        const blogEdit = await Blog.findByIdAndUpdate(id , newBlog , {new : true})

        res.status(200).json({
            ok : true,
            blogEdit
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok : false,
            message : 'Comuniquese con soporte tecnico'
        })
    }
}

const deleteBlog = async (req = request , res = response) => {
    try {
        const {id} = req.params

        const blog = await Blog.findById(id)

        if (!blog) {
            return res.status(404).json({
                ok : false,
                message : 'id no found'
            })
        }

        await Blog.findByIdAndDelete(id)

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
    createBlog,
    getBlog,
    editBlog,
    deleteBlog
}