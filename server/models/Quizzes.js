const mongoose = require('mongoose')
const Schema = mongoose.Schema

const QuizzesSchema = new Schema({
    question:{
        type: String,
        // required: true,
    },
    answer: {
        type: Object,
        // required: true,
    },
    correctAnswer: {
        type: String,
        // required: true,
    },
    lectureId: {
        type:Schema.Types.ObjectId
    },
    courseId: {
        type:Schema.Types.ObjectId,
        ref:'courses'
    }
},{timestamps:true})
module.exports = mongoose.model('quizzes', QuizzesSchema)