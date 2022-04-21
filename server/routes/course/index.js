const express = require('express')
const router = express.Router()
const courseController = require('../../controller/courseController')
const verifyToken=require('../../middleware/auth')
const decentralization=require('../../middleware/decentralization')

router.post('/addCourse', verifyToken,decentralization, courseController.addCourse)
router.get('/getCourse', verifyToken, courseController.getCourse)
router.get('/listCourse', courseController.listCourse)
router.put('/updateCourse/:id', verifyToken,decentralization, courseController.updateCourse)
router.delete('/deleteCourse/:id',verifyToken,decentralization, courseController.deleteCourse)
// router.delete('/deleteCourse/:id', verifyToken, courseController.deleteCourse)
router.post('/testUpload', courseController.testUpload)



module.exports = router