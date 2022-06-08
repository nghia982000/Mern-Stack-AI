const mongoose = require('mongoose')
const Schema = mongoose.Schema

const HistorySchema = new Schema({
    lectureId:{
        type: Schema.Types.ObjectId,
    },
    testResult:{
        type: Array,
    },
    role:{
        type:String,
    },
    result: {
        type: Object,
    },
    precent: {
        type: Object,
    },
    time: {
        type: Number,
    },
    userId: {
        type: Schema.Types.ObjectId,
    }
},{timestamps:true})
module.exports = mongoose.model('historys', HistorySchema)