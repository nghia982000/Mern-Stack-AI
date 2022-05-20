const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ExerciseSchema = new Schema({
    lecture:{
        type: Number,
        // required: true,
    },
    title: {
        type: String,
        // required: true,
    },
    content: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    course: {
        type:Schema.Types.ObjectId,
        ref:'courses'
    }
})
module.exports = mongoose.model('exercises', ExerciseSchema)