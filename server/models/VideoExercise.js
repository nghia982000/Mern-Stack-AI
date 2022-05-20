const mongoose = require('mongoose')
const Schema = mongoose.Schema

const VideoExerciseSchema = new Schema({
    lecture:{
        type: Number,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    role:{
        type:String
    },
    content: {
        type: String,
    },
    url: {
        type: String,
    },  
    duration:{
        type: Number,
    },
    course: {
        type:Schema.Types.ObjectId,
        ref:'courses'
    }
})

module.exports = mongoose.model('videoExercises', VideoExerciseSchema)