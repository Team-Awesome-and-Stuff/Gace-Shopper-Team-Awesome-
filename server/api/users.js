const express = require('express')
const router = express.Router()
const User = require('../db/models/User')
const Order = require('../db/models/Order')
const { adminAuth } = require('../middlewares/authorize')


//Post/api/users/id
router.put('/:id', adminAuth, async (req, res, next) => {
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
