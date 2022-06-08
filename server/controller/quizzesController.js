const Quizzes = require('../models/Quizzes')
const User = require('../models/User')
const History =require('../models/History')

class QuizzesController {

    async createQuizzes(req, res) {
        const { question, answer, correctAnswer } = req.body
        console.log(question, answer, correctAnswer)
        const lectureId = req.params.id
        try {
            const newQuizzes = new Quizzes({
                question,
                answer,
                correctAnswer,
                lectureId
            })
            await newQuizzes.save()
            res.json({
                success: true,
                message: 'Successfully!!!',
                quizzes: newQuizzes
            })
        } catch (error) {
            console.log(error)
            res.status(500).json({
                success: false,
                message: 'Internal server error'
            })
        }
    }
    async deleteQuizzes(req, res) {
        try {
            const quizzesDeleteCondition = {
                _id: req.params.id
            }
            const deletedQuizzes = await Quizzes.findOneAndDelete(quizzesDeleteCondition)
            //User not authorised to update Account or Course not found
            if (!deletedQuizzes) {
                return res.status(401).json({
                    success: false,
                    message: 'Quizzes not found '
                })
            }
            res.json({
                success: true,
                quizzes: deletedQuizzes
            })
        } catch (error) {
            console.log(error)
            res.status(500).json({
                success: false,
                message: 'Internal server error'
            })
        }
    }
    async getQuizzes(req, res) {
        const lectureId = req.params.id
        const userId = req.userId
        try {
            var data = {}
            const role = await User.findOne({ _id: userId, role: 'manager' })
            if (role) {
                data =await Quizzes.find({ lectureId })
            } else {
                data =await Quizzes.find({ lectureId }).select('-correctAnswer')
            }
            res.json({
                success: true,
                data: data
            })
        } catch (error) {
            console.log(error)
            res.status(500).json({
                success: false,
                message: 'Internal server error'
            })
        }
    }
    async updateQuizzes(req, res) {
        const { question, answer, correctAnswer } = req.body
        console.log(question, answer, correctAnswer)
        try {
            let updateQuizzes = {
                question,
                answer,
                correctAnswer
            }
            const quizzesUpdateCondition = {
                _id: req.params.id,
            }
            updateQuizzes = await Quizzes.findOneAndUpdate(
                quizzesUpdateCondition,
                updateQuizzes,
                { new: true }
            )
            //User not authorised to update Course or Course not found
            if (!updateQuizzes) {
                return res.status(401).json({
                    success: false,
                    message: 'Quizzes not found or user not authorised '
                })
            }
            res.json({
                success: true,
                message: 'Excellent progress',
                quizzes: updateQuizzes
            })
        } catch (error) {
            console.log(error)
            res.status(500).json({
                success: false,
                message: 'Internal server error'
            })
        }
    }
    async testResult(req, res) {
        const { listAnswer,role } = req.body
        const lectureId = req.params.id
        const userId = req.userId
        // console.log(listAnswer)
        try {
            const arrResult = await Quizzes.find({ lectureId }).select('correctAnswer')
            // console.log(arrResult)
            const result = listAnswer.reduce((arr, item) => {
                const check = arrResult.some((answer) => {
                    return answer._id == item.id && answer.correctAnswer == item.correctAnswer
                })
                arr.push({
                    id: item.id,
                    check
                })
                return arr
            }, [])
            const historyAnswer = new History({
                lectureId,
                testResult:result,
                userId,
                role
            })
            await historyAnswer.save()
            res.json({
                success: true,
                result: result
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

module.exports = new QuizzesController()