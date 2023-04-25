const express = require('express')
const router = express.Router()
const User = require('../db/models/User')
const { adminAuth } = require('../middlewares/authorize')

//Get/api/users
router.get('/', adminAuth, async (req, res, next) => {
    try {
        const users = await User.findAll()
        res.json(users)
    } catch (err) {
        next(err)
    }
})
//Get/api/users/id
router.get('/:id', async (req, res, next) => {
    try {
        const user = await User.findByPk(req.params.id)
        res.json(user)
    } catch (err) {
        next(err)
    }
})
//Post/api/users
router.post('/', async (req, res, next) => {
    try {
        const user = await User.create(req.body)
        res.json(user)
    } catch (err) {
        next(err)
    }
})
//Post/api/users/id
router.put('/:id', async (req, res, next) => {
    try {
        const user = await User.findByPk(req.params.id)
        const updatedUser = await user.update(req.body)
        res.send(updatedUser)
    } catch (err) {
        next(err)
    }
})
//Delete/api/users/id
router.delete('/:id', async (req, res, next) => {
    try {
        const user = await User.findByPk(req.params.id)
        await user.destroy()
        res.send({ message: 'User deleted' })
    } catch (err) {
        next(err)
    }
})

module.exports = router
