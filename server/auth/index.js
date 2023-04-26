const router = require('express').Router()
const User = require('../db/models/User')

//Post/auth/login
router.post('/login', async (req, res, next) => {
    try {
        const token = await User.authenticate(req.body)
        res.send(token)
    } catch (err) {
        next(err)
    }
})

//Post/auth/signup
router.post('/signup', async (req, res, next) => {
    try {
        const user = await User.create(req.body)
        
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

router.get('/me', async (req, res, next) => {
    try {
        res.send(await User.findByToken(req.headers.authorization))
    } catch (ex) {
        next(ex);
    }
})

module.exports = router
