const History = require('../models/History')
const User = require('../models/User')
const argon2 = require('argon2')
const jwt = require('jsonwebtoken')

class HistoryController {
    
    async createActive(req, res) {
        const { result, precent, userId, time,role } = req.body
        try {
            const newActive = new History({
                result,
                precent,
                userId,
                time,
                role
            })
            const user= await User.findOne({_id:userId})
            const newPoint={
                point:user.point
            }
            if(precent.Working>=80&&time>=1200){
                newPoint.point=user.point+500
            }
            if(precent.Working<=80&&time>=1200){
                newPoint.point=user.point+250
            }
            if(precent.Working>=80&&time<=1200){
                newPoint.point=user.point+250
            }
            if(precent.Working<=80&&time<=1200){
                newPoint.point=user.point+150
            }
            const updatePoint = await User.findOneAndUpdate(
                {_id:userId},
                newPoint,
                { new: true }
            )
            await newActive.save()
            res.json({
                success: true,
                message: 'Successfully!!!',
                newPoint: updatePoint.point,
                newActive
            })
        } catch (error) {
            console.log(error)
            res.status(500).json({
                success: false,
                message: 'Internal server error'
            })
        }
    }
    async getListTestResult(req, res) {
        const lectureId = req.params.id
        const userId = req.userId
        try {
            History.find({
                userId,
                lectureId
            })
            .then(data=>{
                res.json({
                    success: true,
                    listResult: data
                })
            })
            .catch(err => {
                console.log(err)
            })
        } catch (error) {
            console.log(error)
            res.status(500).json({
                success: false,
                message: 'Internal server error'
            })
        }
    }
    async getListAcctive(req, res) {
        const userId = req.userId
        try {
            History.find({
                userId
            })
            .then(data=>{
                res.json({
                    success: true,
                    listAcctive: data
                })
            })
            .catch(err => {
                console.log(err)
            })
        } catch (error) {
            console.log(error)
            res.status(500).json({
                success: false,
                message: 'Internal server error'
            })
        }
    }

    
}

module.exports = new HistoryController()