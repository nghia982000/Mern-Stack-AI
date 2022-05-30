const auth = require('./auth')
const course = require('./course')
const videoExercise = require('./videoExercise')
const monitor = require('./monitor')
const comment=require('./comment')
const quizzes=require('./quizzes')

function route(app) {

    app.use('/auth', auth)
    app.use('/course', course)
    app.use('/videoExercise', videoExercise)
    app.use('/monitor', monitor)
    app.use('/comment', comment)
    app.use('/quizzes', quizzes)

}


module.exports = route