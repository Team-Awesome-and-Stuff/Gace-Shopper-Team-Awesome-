const router = require('express').Router()
const User = require('../db/models/User')
// const cookie = require('cookie-parser')

//Post/auth/login
router.post('/login', async (req, res, next) => {
    try {
        let user = req.headers.authorization
        console.log('LINE 9 USER>>>>>', user)
        const token = await User.authenticate(user.email, user.password)
        res.send(token)
    } catch (err) {
        next(err)
    }
})

//Post/auth/signup
router.post('/signup', async (req, res, next) => {
    try {
        const { email, password } = req.body
        const user = await User.create({
            email: email,
            password: password,
        })
        const token = await user.generateToken()
        res.send(token)
    } catch (err) {
        if (err.name === 'SequelizeUniqueConstraintError') {
            res.status(401).send('User already exists')
        } else {
            next(err)
        }
    }
})

module.exports = router
