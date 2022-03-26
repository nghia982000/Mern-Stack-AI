const express = require('express')
const router = express.Router()
const courseController = require('../../controller/courseController')
const verifyToken=require('../../middleware/auth')

router.post('/addCourse', verifyToken, courseController.addCourse)
router.get('/getCourse', verifyToken, courseController.getCourse)
router.get('/listCourse', courseController.listCourse)
router.put('/updateCourse/:id', verifyToken, courseController.updateCourse)
router.delete('/deleteCourse/:id', verifyToken, courseController.deleteCourse)



module.exports = router