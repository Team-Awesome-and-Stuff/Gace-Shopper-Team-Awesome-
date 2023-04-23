const express = require('express')
const router = express.Router()
const User = require('../db/models/User')
const { adminAuth } = require('../middlewares/authorize')

//Get/api/users
router.get('/', adminAuth, async (req, res, next) => {
    const users = await User.findAll()
    res.json(users)
})

router.get('/:id', async (req, res, next) => {
    const user = await User.findByPk(req.params.id)
    res.json(user)
})

router.post('/', async (req, res, next) => {
    const user = await User.create(req.body)
    res.json(user)
})

router.put('/:id', async (req, res, next) => {
    const user = await User.findByPk(req.params.id)
    const updatedUser = await user.update(req.body)

    res.send(updatedUser)
})

router.delete('/:id', async (req, res, next) => {
    const user = await User.findByPk(req.params.id)
    await user.destroy()
    res.send({ message: 'User deleted' })
})

module.exports = router
