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
    course: {
        type:Schema.Types.ObjectId,
        ref:'courses'
    }
},{timestamps:true})
module.exports = mongoose.model('exercises', ExerciseSchema)