const express = require('express')
const router = express.Router()
const historyController = require('../../controller/historyController')
const verifyToken=require('../../middleware/auth')

router.post('/createActive', historyController.createActive)
router.get('/getListTestResult/:id',verifyToken, historyController.getListTestResult)
router.get('/getListAcctive',verifyToken, historyController.getListAcctive)


module.exports = router