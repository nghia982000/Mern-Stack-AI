const express = require('express')
const router = express.Router()
const commentController = require('../../controller/commentController')
const verifyToken=require('../../middleware/auth')
const decentralization=require('../../middleware/decentralization')

router.post('/createComment',verifyToken, commentController.createComment)
router.post('/getComment',verifyToken, commentController.getComment)
router.get('/getListComment',verifyToken,decentralization, commentController.getListComment)
router.delete('/deleteComment/:id',verifyToken,decentralization, commentController.deleteComment)


module.exports = router