const { request, response } = require("express");
const Course = require('../models/course')


const createCourse = async (req = request , res = response) => {

    try {
        const {name , i} = req.body

        let course = await Course.findOne({name})

        if(course) {
            return res.status(401).json({
                ok: false,
                message : 'Course alredy created'
            })

        }

        course = new Course(req.body)

        await course.save()

        res.status(200).json({
            ok : true,
            course
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok : false,
            message : 'Comuniquese con soporte tecnico'
        })
    }
}

const getCourse = async (req = request , res = response) => {

    try {
        const course = await Course.find()

        res.json({
            ok : true,
            course
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok : false,
            message : 'Comuniquese con soporte tecnico'
        })
    }
}

const deleteCourse = async (req = request , res = response) => {

    try {
        const {id} = req.params

        const courseId = await Course.findById(id)
        
        if(!courseId) {
            return res.status(404).json({
                ok : false,
                message : 'no id'
            })
        }

        await Course.findByIdAndDelete(id)

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

const updateCouser = async (req = request , res = response) => {

    try {
        const {id} = req.params
        const courseId = await Course.findById(id)

        if(!courseId) {
            return res.status(404).json({
                ok : false,
                message : 'no id'
            })
        }

        const newCourse = (req.body)

        const courseUpdate = await Course.findByIdAndUpdate(id , newCourse , {new : true})

        res.status(200).json({
            ok : true,
            courseUpdate
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
    createCourse,
    getCourse,
    deleteCourse,
    updateCouser
}