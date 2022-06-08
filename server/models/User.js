const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role:{
        type: String,
        required: true
    },
    point:{
        type: Number,
    },
    email:{
        type:String,
        required: true
    },
    nameAccount:{
        type:String,
        required: true
    }
},{timestamps:true})

module.exports = mongoose.model('users', UserSchema)