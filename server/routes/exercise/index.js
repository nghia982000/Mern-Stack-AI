const express = require('express')
const router = express.Router()
const exerciseController = require('../../controller/exerciseController')
const verifyToken=require('../../middleware/auth')

router.post('/createExercise',verifyToken, exerciseController.createExercise)


module.exports = router