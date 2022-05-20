const Exercise = require('../models/Exercise')

class ExerciseController {

    async createExercise(req, res) {
        const {content,id ,title, lecture} = req.body
        try {
            console.log(content, id)
            const newExercise = new Exercise({
                title,
                lecture,
                content:content,
                course:id
            })
            await newExercise.save()
            res.json({
                success: true,
                message: 'Successfully!!!',
                exercise: newExercise
            })
        } catch (error) {
            console.log(error)
            res.status(500).json({
                success: false,
                message: 'Internal server error'
            })
        }
    }
   


}

module.exports = new ExerciseController()