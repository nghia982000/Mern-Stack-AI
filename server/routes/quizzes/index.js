const express = require('express')
const router = express.Router()
const quizzesController = require('../../controller/quizzesController')
const verifyToken=require('../../middleware/auth')
const decentralization=require('../../middleware/decentralization')

router.post('/createQuizzes/:id',verifyToken,decentralization, quizzesController.createQuizzes)
router.delete('/deleteQuizzes/:id',verifyToken,decentralization, quizzesController.deleteQuizzes)
router.get('/getQuizzes/:id',verifyToken, quizzesController.getQuizzes)
router.put('/updateQuizzes/:id',verifyToken,decentralization, quizzesController.updateQuizzes)
router.post('/testResult/:id',verifyToken, quizzesController.testResult)


module.exports = router