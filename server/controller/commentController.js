const Comment = require('../models/Comment')
const User = require('../models/User')

class CommentController {

    async createComment(req, res) {
        const { content, videoId } = req.body
        try {
            const userId = req.userId
            // console.log({name, content,userId,videoId})
            const user = await User.findOne({ _id: userId })
            const newComment = new Comment({
                name: user.nameAccount,
                content,
                userId,
                videoId
            })
            await newComment.save()
            res.json({
                success: true,
                message: 'Successfully!!!',
                comment: newComment
            })
        } catch (error) {
            console.log(error)
            res.status(500).json({
                success: false,
                message: 'Internal server error'
            })
        }
    }
    async getComment(req, res) {
        const { videoId } = req.body
        try {
            Comment.find({ videoId })
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
    async getListComment(req, res) {
        try {
            Comment.find({report:true})
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
    async deleteComment(req, res) {
        try {
            const commentDeleteCondition = {
                _id: req.params.id
            }
            const deletedComment = await Comment.findOneAndDelete(commentDeleteCondition)
            //User not authorised to update Account or Course not found
            if (!deletedComment) {
                return res.status(401).json({
                    success: false,
                    message: 'Comment not found '
                })
            }
            res.json({
                success: true,
                comment: deletedComment
            })
        } catch (error) {
            console.log(error)
            res.status(500).json({
                success: false,
                message: 'Internal server error'
            })
        }
    }
    async reportComment(req, res) {
        try {
            const report=await Comment.findByIdAndUpdate(
                {_id:req.params.id},
                {
                    report:true
                },
                {new: true }
            )
            if (!report) {
                return res.status(401).json({
                    success: false,
                    message: 'Comment not found '
                })
            }
            res.json({
                success: true,
                report
            })
        } catch (error) {
            console.log(error)
            res.status(500).json({
                success: false,
                message: 'Internal server error'
            })
        }
    }
    async replyComment(req, res) {
        const {nameAccount,content}=req.body
        try {
            const rep=await Comment.findByIdAndUpdate(
                {_id:req.params.id},
                {
                    $push: {
                        reply: {
                            nameAccount,
                            content
                        }
                    }
                },
                {new: true }
            )
            if (!rep) {
                return res.status(401).json({
                    success: false,
                    message: 'Comment not found '
                })
            }
            res.json({
                success: true,
                reply:rep.reply
            })
        } catch (error) {
            console.log(error)
            res.status(500).json({
                success: false,
                message: 'Internal server error'
            })
        }
    }
    async getListReplyComment(req, res) {
        try {
            const rep=await Comment.findOne({_id:req.params.id})
            if (!rep) {
                return res.status(401).json({
                    success: false,
                    message: 'Comment not found '
                })
            }
            res.json({
                success: true,
                reply:rep.reply
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

module.exports = new CommentController()