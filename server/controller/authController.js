const User = require('../models/User')
const argon2 = require('argon2')
const jwt = require('jsonwebtoken')

class AuthController {

    async register(req, res) {
        const { username, password, role, email, nameAccount } = req.body
        if (!username || !password) {
            return res.status(400).json({
                message: 'Missing username and/or password',
                success: false
            })
        }
        if (role === 'manager') {
            return res.status(400).json({
                message: 'Create fail',
                success: false
            })
        }
        try {
            //check for existing user
            const user = await User.findOne({ username: username })

            if (user) {
                return res.status(400).json({
                    success: false,
                    message: 'Username already taken'
                })
            }
            //All good
            const hashedPassword = await argon2.hash(password)
            const newUser = new User({
                username,
                password: hashedPassword,
                role,
                point: 0,
                nameAccount,
                email
            })
            await newUser.save()
            //Return token
            const accessToken = jwt.sign({ userId: newUser._id }, process.env.ACCESS_TOKEN_SECRET)
            res.json({
                success: true,
                message: 'User created successfully',
                accessToken
            })

        } catch (error) {
            console.log(error)
            res.status(500).json({
                success: false,
                message: 'Internal server error'
            })
        }

    }

    async login(req, res) {
        const { username, password } = req.body
        if (!username || !password) {
            return res.status(400).json({
                message: 'Missing username and/or password',
                success: false
            })
        }
        try {
            //check for existing user
            const user = await User.findOne({ username: username })

            if (!user) {
                return res.status(400).json({
                    success: false,
                    message: 'Incorrect username '
                })
            }
            //Username found
            const passwordValid = await argon2.verify(user.password, password)
            if (!passwordValid) {
                return res.status(400).json({
                    success: false,
                    message: 'Incorrect password'
                })
            }
            //All good
            const accessToken = jwt.sign({ userId: user._id }, process.env.ACCESS_TOKEN_SECRET)
            res.json({
                success: true,
                message: 'User logged in successfully',
                accessToken,
                role: user.role,
                user: {
                    _id: user._id,
                    username: user.username,
                    role: user.role
                }
            })

        } catch (error) {
            console.log(error)
            res.status(500).json({
                success: false,
                message: 'Internal server error'
            })
        }
    }

    async checkLogin(req, res) {
        try {
            const user = await User.findById(req.userId).select('-password')
            if (!user)
                return res.status(400).json({ success: false, message: 'User not found' })
            res.json({ success: true, user })
        } catch (error) {
            console.log(error)
            res.status(500).json({ success: false, message: 'Internal server error' })
        }
    }
    async getAccount(req, res) {
        try {
            User.find({ role: 'user' })
                .then(data => {
                    res.json({ success: true, data })
                })
                .catch(err => {
                    console.log(err)
                })
        } catch (error) {
            console.log(error)
            res.status(500).json({ success: false, message: 'Internal server error' })
        }
    }
    async deleteAccount(req, res) {
        try {
            const userDeleteCondition = {
                _id: req.params.id
            }
            const deletedUser = await User.findOneAndDelete(userDeleteCondition)
            //User not authorised to update Account or Course not found
            if (!deletedUser) {
                return res.status(401).json({
                    success: false,
                    message: 'Account not found '
                })
            }
            res.json({
                success: true,
                user: deletedUser
            })
        } catch (error) {
            console.log(error)
            res.status(500).json({
                success: false,
                message: 'Internal server error'
            })
        }
    }
    async changePassword(req, res) {
        const { username, email, oldPassword, newPassword } = req.body
        try {
            const user = await User.findOne({
                username,
                email
            })
            if (!user) {
                return res.status(400).json({
                    success: false,
                    message: 'Incorrect email or username '
                })
            }
            const passwordValid = await argon2.verify(user.password, oldPassword)
            if (!passwordValid) {
                return res.status(400).json({
                    success: false,
                    message: 'Incorrect password '
                })
            }
            const hashedPassword = await argon2.hash(newPassword)
            const updatePassword = await User.findOneAndUpdate(
                {
                    username,
                    email
                },
                {
                    password:hashedPassword
                },
                { new: true }
            )
            if(updatePassword){
                res.json({
                    success: true,
                    message: 'Change password in successfully',
                })
            }
        } catch (error) {
            console.log(error)
            res.status(500).json({
                success: false,
                message: 'Internal server error'
            })
        }
    }
    async fogotPassword(req, res) {
        const { username, email, oldPassword, newPassword } = req.body
        try {
            const user = await User.findOne({
                username,
                email
            })
            if (!user) {
                return res.status(400).json({
                    success: false,
                    message: 'Incorrect email or username '
                })
            }
            const passwordValid = await argon2.verify(user.password, oldPassword)
            if (!passwordValid) {
                return res.status(400).json({
                    success: false,
                    message: 'Incorrect password '
                })
            }
            const hashedPassword = await argon2.hash(newPassword)
            const updatePassword = await User.findOneAndUpdate(
                {
                    username,
                    email
                },
                {
                    password:hashedPassword
                },
                { new: true }
            )
            if(updatePassword){
                res.json({
                    success: true,
                    message: 'Change password in successfully',
                })
            }
        } catch (error) {
            console.log(error)
            res.status(500).json({
                success: false,
                message: 'Internal server error'
            })
        }
    }
    async detailAccount(req, res) {

        try {
            User.findOne({_id:req.params.id})
            .then(data=>{
                res.json({
                    success: true,
                    detail:data
                })
            })
            .catch(err=>{
                console.log(err)
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

module.exports = new AuthController()