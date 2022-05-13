const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MonitorSchema = new Schema({
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
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})
module.exports = mongoose.model('monitors', MonitorSchema)