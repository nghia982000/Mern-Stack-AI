const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CommentSchema = new Schema({
    name: {
        type: String,
    },
    content: {
        type: String,
    },
    userId:{
        type:Schema.Types.ObjectId,
    },
    videoId:{
        type:Schema.Types.ObjectId,
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})
module.exports = mongoose.model('comments', CommentSchema)