const auth = require('./auth')
const course = require('./course')
const videoExercise = require('./videoExercise')
const monitor = require('./monitor')
const comment=require('./comment')
const exercise=require('./exercise')

function route(app) {

    app.use('/auth', auth)
    app.use('/course', course)
    app.use('/videoExercise', videoExercise)
    app.use('/monitor', monitor)
    app.use('/comment', comment)
    app.use('/exercise', exercise)

}


module.exports = route