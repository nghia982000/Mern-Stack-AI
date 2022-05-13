const express = require('express')
const router = express.Router()
const monitorController = require('../../controller/monitorController')
const verifyToken=require('../../middleware/auth')
const decentralization=require('../../middleware/decentralization')

router.post('/createActive', monitorController.createActive)


module.exports = router