const auth = require('./auth')
const course = require('./course')

function route(app) {

    app.use('/auth', auth)
    app.use('/course', course)

}


module.exports = route