const Monitor = require('../models/Monitor')
const argon2 = require('argon2')
const jwt = require('jsonwebtoken')

class MonitorController {
    
    async createActive(req, res) {
        const { result, precent, userId, time } = req.body
        try {
            const newActive = new Monitor({
                result,
                precent,
                userId,
                time
            })
            await newActive.save()
            res.json({
                success: true,
                message: 'Successfully!!!',
                Active: newActive
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

module.exports = new MonitorController()