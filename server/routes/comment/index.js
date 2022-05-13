const express = require('express')
const router = express.Router()
const commentController = require('../../controller/commentController')
const verifyToken=require('../../middleware/auth')

router.post('/createComment',verifyToken, commentController.createComment)
router.post('/getComment',verifyToken, commentController.getComment)


module.exports = router