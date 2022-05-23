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
            res.json({ success: true, data })
        } catch (error) {
            console.log(error)
            res.status(500).json({
                success: false,
                message: 'Internal server error'
            })
        }
    }
    async createVideo(req, res) {
        const { title, lecture, id,role } = req.body
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
                lecture,
                role,
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
        const { title, lecture, id, url,duration} = req.body
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
            lecture,
            id,
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
            console.log(deletedVideo)
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
        const {content,id ,title, lecture, role} = req.body
        try {
            console.log(content,id ,title, lecture, role)
            const newExercise = new VideoExercise({
                title,
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
        const {content,id ,title, lecture, role} = req.body
        console.log(req.params.id)
        try {
            let updateExercise = {
                title,
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
}

module.exports = new VideoExerciseController()