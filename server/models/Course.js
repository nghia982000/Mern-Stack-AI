const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CourseSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    image: {
        type: String,
    },
    benefit: {
        type: Array,
    },
    user: {
        type:Schema.Types.ObjectId,
        ref:'users'
    }
})

module.exports = mongoose.model('courses', CourseSchema)