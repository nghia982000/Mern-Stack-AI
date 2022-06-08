const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CommentSchema = new Schema({
    name: {
        type: String,
    },
    content: {
        type: String,
    },
    report:{
        type:Boolean
    },
    reply:{
        type:Array
    },
    userId:{
        type:Schema.Types.ObjectId,
    },
    videoId:{
        type:Schema.Types.ObjectId,
    }
},{timestamps:true})
module.exports = mongoose.model('comments', CommentSchema)