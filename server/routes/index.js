const auth = require('./auth')
const course = require('./course')
const video = require('./video')
const monitor = require('./monitor')
const comment=require('./comment')

function route(app) {

    app.use('/auth', auth)
    app.use('/course', course)
    app.use('/video', video)
    app.use('/monitor', monitor)
    app.use('/comment', comment)

}


module.exports = route