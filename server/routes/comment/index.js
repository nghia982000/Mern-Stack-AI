const express = require('express')
const router = express.Router()
const commentController = require('../../controller/commentController')
const verifyToken=require('../../middleware/auth')
const decentralization=require('../../middleware/decentralization')

router.post('/createComment',verifyToken, commentController.createComment)
router.post('/getComment',verifyToken, commentController.getComment)
router.get('/getListComment',verifyToken,decentralization, commentController.getListComment)
router.delete('/deleteComment/:id',verifyToken,decentralization, commentController.deleteComment)
router.get('/reportComment/:id',verifyToken, commentController.reportComment)
router.post('/replyComment/:id',verifyToken, commentController.replyComment)
router.get('/getListReplyComment/:id',verifyToken, commentController.getListReplyComment)
router.get('/getCmt/:id',verifyToken, commentController.getCmt)


module.exports = router