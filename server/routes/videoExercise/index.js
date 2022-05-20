const express = require('express')
const router = express.Router()
const videoExerciseController = require('../../controller/videoExerciseController')
const verifyToken=require('../../middleware/auth')
const decentralization=require('../../middleware/decentralization')

router.post('/createVideo', verifyToken,decentralization, videoExerciseController.createVideo)
router.get('/getVideo/:id', videoExerciseController.getVideo)
// router.get('/listCourse', courseController.listCourse)
router.put('/updateVideo', verifyToken,decentralization, videoExerciseController.updateVideo)
router.delete('/deleteVideo/:id',verifyToken,decentralization, videoExerciseController.deleteVideo)
// router.get('/model',videoController.getModel)
router.post('/createExercise',verifyToken,decentralization, videoExerciseController.createExercise)

module.exports = router