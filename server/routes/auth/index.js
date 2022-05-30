const express = require('express')
const router = express.Router()
const authController = require('../../controller/authController')
const verifyToken=require('../../middleware/auth')
const decentralization=require('../../middleware/decentralization')

router.get('/checkLogin',verifyToken,authController.checkLogin )
router.get('/getAccount',verifyToken,decentralization,authController.getAccount )
router.delete('/deleteAccount/:id',verifyToken,decentralization,authController.deleteAccount )
router.post('/register', authController.register)
router.post('/login', authController.login)

module.exports = router