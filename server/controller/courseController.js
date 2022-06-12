const Course = require('../models/Course')
const User = require('../models/User')
const VideoExercise = require('../models/VideoExercise')
const argon2 = require('argon2')
const jwt = require('jsonwebtoken')
const { findOneAndUpdate } = require('../models/Course')
const cloudinary = require('cloudinary').v2
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
})
// const fs = require('fs')
// const removeTmp = (path) =>{
//     fs.unlink(path, err=>{
//         if(err) throw err
//     })
// }
class CourseController {

    async listCourse(req, res, next) {
        try {
            Course.find({})
                .then(data => {
                    const listField = data.map((item) => (item.field))
                    let newListField = []
                    newListField = listField.filter((item) => {
                        return newListField.includes(item) ? '' : newListField.push(item)
                    })
                    res.json({ success: true, data, listField: newListField })
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

    // async getCourse(req, res) {
    //     try {
    //         const courses = await Course.find({ user: req.userId})
    //         res.json({ success: true, courses })
    //     } catch (error) {
    //         console.log(error)
    //         res.status(500).json({
    //             success: false,
    //             message: 'Internal server error'
    //         })
    //     }
    // }
    async getCourse(req, res) {
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
    async selectField(req, res) {
        const field = req.body.field
        try {
            const listCourse = await Course.find({})
            Course.find({ field })
                .then(data => {
                    const listField = listCourse.map((item) => (item.field))
                    let newListField = []
                    newListField = listField.filter((item) => {
                        return newListField.includes(item) ? '' : newListField.push(item)
                    })
                    res.json({ success: true, data, listField: newListField })
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

    async addCourse(req, res) {
        const { title, description, image, benefit, point, field } = req.body
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
                benefit: benefit.split('\n'),
                point,
                field
                // url: url.startsWith('https://') ? url : `https://${url}`,
                // user: req.userId
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
        const { title, description, image, benefit, point, field } = req.body
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
                benefit: benefit.split('\n'),
                point,
                field
            }
            const courseUpdateCondition = {
                _id: req.params.id,
                // user: req.userId
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
                course: updateCourse
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
                _id: req.params.id
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

    // async testUpload(req, res, next) {
    //     console.log(req.files.photo)
    //     const file = req.files.photo
    //     console.log(file)
    //     if(file){
    //         removeTmp(file.tempFilePath)
    //     }
    //     // cloudinary.uploader.upload(
    //     //     file.tempFilePath,
    //     //     { resource_type: "video" },
    //     //     (err, result) => {
    //     //         console.log(result)
    //     //     })
    // }

    async searchCourse(req, res, next) {
        const item = req.body.item
        console.log(item)
        if (item) {
            const listCourse = await Course.find({})
            Course.find({ $text: { $search: item } })
                .then(data => {
                    const listField = listCourse.map((item) => (item.field))
                    let newListField = []
                    newListField = listField.filter((item) => {
                        return newListField.includes(item) ? '' : newListField.push(item)
                    })
                    res.json({ success: true, data, listField: newListField })
                })
                .catch(err => {
                    res.status(500).json({
                        success: false,
                        message: 'Internal server error'
                    })
                })
        }
        else {
            Course.find({})
                .then(data => {
                    const listField = data.map((item) => (item.field))
                    let newListField = []
                    newListField = listField.filter((item) => {
                        return newListField.includes(item) ? '' : newListField.push(item)
                    })
                    res.json({ success: true, data, listField: newListField })
                })
                .catch(err => {
                    res.status(500).json({
                        success: false,
                        message: 'Internal server error'
                    })
                })
        }
    }
    async favoriteCourse(req, res, next) {
        const { id } = req.body
        // console.log(id)
        try {
            const idCourse = id
            const idUser = req.userId
            Course.findOneAndUpdate({ _id: idCourse }, {
                $push: {
                    favorite: {
                        id: idUser
                    }
                }
            },
                { new: true }
            )
                .then(data => {
                    res.json({
                        success: true,
                        data: data
                    })
                })
                .catch(err => {
                    res.status(500).json({
                        success: false,
                        message: 'Internal server error'
                    })
                })

        } catch (error) {
            console.log(error)
            res.status(500).json({
                success: false,
                message: 'Internal server error'
            })
        }
    }
    async buyCourse(req, res, next) {
        const { id } = req.body
        // console.log(id)
        try {
            const idCourse = id
            const idUser = req.userId
            Course.findOneAndUpdate({ _id: idCourse }, {
                $push: {
                    course: {
                        id: idUser
                    }
                }
            },
                { new: true }
            )
                .then(data => {
                    res.json({
                        message: "Successfully purchase",
                        success: true,
                        point: req.point,
                        data: data
                    })
                })
                .catch(err => {
                    res.status(500).json({
                        success: false,
                        message: 'Internal server error'
                    })
                })

        } catch (error) {
            console.log(error)
            res.status(500).json({
                success: false,
                message: 'Internal server error'
            })
        }
    }
    async getBoughtCourse(req, res, next) {
        const idUser = req.userId
        try {
            Course.find({ course: { "id": idUser } })
                .then(data => {
                    res.json({
                        success: true,
                        data: data
                    })
                })
                .catch(err => {
                    res.status(500).json({
                        success: false,
                        message: 'Internal server error'
                    })
                })
        } catch (error) {
            console.log(error)
            res.status(500).json({
                success: false,
                message: 'Internal server error'
            })
        }
    }
    async getFavorite(req, res, next) {
        const idUser = req.userId
        try {
            Course.find({ favorite: { "id": idUser } })
                .then(data => {
                    res.json({
                        success: true,
                        data: data
                    })
                })
                .catch(err => {
                    res.status(500).json({
                        success: false,
                        message: 'Internal server error'
                    })
                })
        } catch (error) {
            console.log(error)
            res.status(500).json({
                success: false,
                message: 'Internal server error'
            })
        }
    }
    async deleteFavorite(req, res, next) {
        try {
            const idCourse = req.params.id
            const idUser = req.userId
            Course.findOneAndUpdate({ _id: idCourse }, {
                $pull: {
                    favorite: {
                        id: idUser
                    }
                }
            })
                .then(data => {
                    res.json({
                        success: true,
                        data: data
                    })
                })
                .catch(err => {
                    res.status(500).json({
                        success: false,
                        message: 'Internal server error'
                    })
                })
        } catch (error) {
            console.log(error)
            res.status(500).json({
                success: false,
                message: 'Internal server error'
            })
        }
    }
    async statistical(req, res) {
        try {
            const quantityUser=(await User.find({})).length
            const listCourse=await Course.find({})
            const listLecture=await VideoExercise.find({})
            const quantityStudent=listCourse.reduce((total,item)=>{
                return total=total+item.course.length
            },0)
            res.json({
                success: true,
                data: {
                    student:quantityStudent,
                    user:quantityUser,
                    course:listCourse.length,
                    video:listLecture.filter(item=>item.role==='video').length,
                    quizzes:listLecture.filter(item=>item.role==='quizzes').length,
                    text:listLecture.filter(item=>item.role==='exercise').length,
                }
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