const VideoExercise = require('../models/VideoExercise')
const argon2 = require('argon2')
const jwt = require('jsonwebtoken')
const { findOneAndUpdate } = require('../models/VideoExercise')
const cloudinary = require('cloudinary').v2
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
})
const fs = require('fs')
const removeTmp = (path) =>{
    fs.unlink(path, err=>{
        if(err) throw err
    })
}
class VideoExerciseController {

    async getVideo(req, res) {
        const id = req.params.id
        try {
            const data = await VideoExercise.find({ course: id })
            // const sortData=data.sort((a,b)=>{
            //     return a.lecture-b.lecture
            // })
            res.json({ 
                success: true, 
                data: data.sort((a,b)=>{
                    return a.lecture-b.lecture||a.lesson-b.lesson
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
    async createVideo(req, res) {
        const { title, lecture, id,role,lesson } = req.body
        const video = req.files.video
        try {
            const urlVideo = await cloudinary.uploader.upload(
                video.tempFilePath,
                { resource_type: "video" },
                (err, result) => {
                    removeTmp(video.tempFilePath)
                    return result
                }
            )
            console.log(urlVideo)
            const newVideo = new VideoExercise({
                title,
                lesson,
                lecture,
                role,
                public_id:urlVideo.public_id,
                url: urlVideo.url,
                course: id,
                duration:urlVideo.duration
            })
            await newVideo.save()
            res.json({
                success: true,
                message: 'Successfully!!!',
                video: newVideo
            })
        } catch (error) {
            console.log(error)
            res.status(500).json({
                success: false,
                message: 'Internal server error'
            })
        }
    }

    async updateVideo(req, res) {
        // const video = req.files.video
        const { title, lecture, id, url,duration,public_id,lesson} = req.body
        const videoUrl = {
            url
        }
        if (!url) {
            const video = req.files.video
            videoUrl.url = await cloudinary.uploader.upload(
                video.tempFilePath,
                { resource_type: "video" },
                (err, result) => result
            )
        }
        console.log(videoUrl.url.url || url)
        console.log(videoUrl)
        let updateVideo = {
            title,
            lesson,
            lecture,
            id,
            public_id:videoUrl.url. public_id || public_id,
            url: videoUrl.url.url || url,
            duration:videoUrl.url.duration||duration
        }
        const videoUpdateCondition = {
            _id: id,
        }
        updateVideo = await VideoExercise.findOneAndUpdate(
            videoUpdateCondition,
            updateVideo,
            { new: true }
        )
        //User not authorised to update Course or Course not found
        if (!updateVideo) {
            return res.status(401).json({
                success: false,
                message: 'Course not found or user not authorised '
            })
        }
        res.json({
            success: true,
            message: 'Excellent progress',
            video: updateVideo
        })
    } catch(error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        })
    }


    async deleteVideo(req, res) {
        try {
            const videoDeleteCondition = {
                _id: req.params.id
            }
            const deletedVideo = await VideoExercise.findOneAndDelete(videoDeleteCondition)
            if(deletedVideo.role==='video'){
                await cloudinary.uploader.destroy(deletedVideo.public_id, { resource_type: "video" }, function(error,result) {
                    console.log(result, error) })
            }
            //User not authorised to update Course or Course not found
            if (!deletedVideo) {
                return res.status(401).json({
                    success: false,
                    message: 'Course not found or user not authorised '
                })
            }
            res.json({
                success: true,
                video: deletedVideo
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
    //     cloudinary.uploader.upload(
    //         file.tempFilePath,
    //         { resource_type: "video" },
    //         (err, result) => {
    //             console.log(result)
    //         })
    // }
    async createExercise(req, res) {
        const {content,id ,title, lecture, role,lesson} = req.body
        try {
            console.log(content,id ,title, lecture, role)
            const newExercise = new VideoExercise({
                title,
                lesson,
                lecture,
                content:content,
                course:id,
                role
            })
            await newExercise.save()
            res.json({
                success: true,
                message: 'Successfully!!!',
                exercise: newExercise
            })
        } catch (error) {
            console.log(error)
            res.status(500).json({
                success: false,
                message: 'Internal server error'
            })
        }
    }
    async updateExercise(req, res) {
        const {content,id ,title, lecture, role,lesson} = req.body
        console.log(req.params.id)
        try {
            let updateExercise = {
                title,
                lesson,
                lecture,
                content:content,
                course:id,
                role
            }
            const exerciseUpdateCondition = {
                _id: req.params.id,
                // user: req.userId
            }
            updateExercise = await VideoExercise.findOneAndUpdate(
                exerciseUpdateCondition,
                updateExercise,
                { new: true }
            )
            //User not authorised to update Course or Course not found
            if (!updateExercise) {
                return res.status(401).json({
                    success: false,
                    message: 'Exercise not found or user not authorised '
                })
            }
            res.json({
                success: true,
                message: 'Excellent progress',
                exercise: updateExercise
            })
        } catch (error) {
            console.log(error)
            res.status(500).json({
                success: false,
                message: 'Internal server error'
            })
        }
    }
    async createQuizzes(req, res) {
        const {id,title, lecture, role,lesson} = req.body
        try {
            console.log(id ,title, lecture, role)
            const newQuizzes = new VideoExercise({
                title,
                lesson,
                lecture,
                course:id,
                role
            })
            await newQuizzes.save()
            res.json({
                success: true,
                message: 'Successfully!!!',
                quizzes: newQuizzes
            })
        } catch (error) {
            console.log(error)
            res.status(500).json({
                success: false,
                message: 'Internal server error'
            })
        }
    }
    async updateQuizzes(req, res) {
        const {id ,title, lecture, role,lesson} = req.body
        console.log(req.params.id)
        try {
            let updateQuizzes = {
                title,
                lesson,
                lecture,
                course:id,
                role
            }
            const quizzesUpdateCondition = {
                _id: req.params.id,
                // user: req.userId
            }
            updateQuizzes = await VideoExercise.findOneAndUpdate(
                quizzesUpdateCondition,
                updateQuizzes,
                { new: true }
            )
            //User not authorised to update Course or Course not found
            if (!updateQuizzes) {
                return res.status(401).json({
                    success: false,
                    message: 'Quizzes not found or user not authorised '
                })
            }
            res.json({
                success: true,
                message: 'Excellent progress',
                quizzes: updateQuizzes
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

module.exports = new VideoExerciseController()