const Course = require('../models/Course')
const argon2 = require('argon2')
const jwt = require('jsonwebtoken')
const { findOneAndUpdate } = require('../models/Course')
class CourseController {

    async listCourse(req, res, next) {
        try {
            Course.find({})
                .then(data => {
                    res.json({ success: true, data })
                })
                .catch(err => {
                    console.log(err)
                })
        } catch (error) {
            console.log(error)
            res.status(500).json({
                success: false,
                message: 'Internal server error'
            })
        }
    }

    async getCourse(req, res) {
        try {
            const courses = await Course.find({ user: req.userId })
            res.json({ success: true, courses })
        } catch (error) {
            console.log(error)
            res.status(500).json({
                success: false,
                message: 'Internal server error'
            })
        }
    }

    async addCourse(req, res) {
        const { title, description,url,image} = req.body
        if (!title) {
            return res.status(400).json({
                message: 'Title is required',
                success: false
            })
        }
        try {
            const newCourse = new Course({
                title,
                description,
                image,
                url: url.startsWith('https://') ? url : `https://${url}`,
                user:req.userId
            })
            await newCourse.save()
            res.json({
                success: true,
                message: 'Successfully!!!',
                Course: newCourse
            })
        } catch (error) {
            console.log(error)
            res.status(500).json({
                success: false,
                message: 'Internal server error'
            })
        }
    }
    async updateCourse(req, res) {
        const { title, description, url,image}= req.body
        if (!title) {
            return res.status(400).json({
                message: 'Title is required',
                success: false
            })
        }
        try {
            let updateCourse = {
                title,
                description,
                image,
                url: url.startsWith('https://') ? url : `https://${url}`
            }
            const courseUpdateCondition = {
                _id: req.params.id,
                user: req.userId
            }
            updateCourse = await Course.findOneAndUpdate(
                courseUpdateCondition,
                updateCourse,
                { new: true }
            )
            //User not authorised to update Course or Course not found
            if (!updateCourse) {
                return res.status(401).json({
                    success: false,
                    message: 'Course not found or user not authorised '
                })
            }
            res.json({
                success: true,
                message: 'Excellent progress',
                Course: updateCourse
            })
        } catch (error) {
            console.log(error)
            res.status(500).json({
                success: false,
                message: 'Internal server error'
            })
        }
    }
    async deleteCourse(req, res) {
        try {
            const courseDeleteCondition = {
                _id: req.params.id,
                user: req.userId
            }
            const deletedCourse = await Course.findOneAndDelete(courseDeleteCondition)
            //User not authorised to update Course or Course not found
            if (!deletedCourse) {
                return res.status(401).json({
                    success: false,
                    message: 'Course not found or user not authorised '
                })
            }
            res.json({
                success: true,
                course: deletedCourse
            })
        } catch (error) {
            console.log(error)
            res.status(500).json({
                success: false,
                message: 'Internal server error'
            })
        }
    }
}

module.exports = new CourseController()