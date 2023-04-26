const express = require('express')
const router = express.Router()
const User = require('../db/models/User')
const Order = require('../db/models/Order')
const { adminAuth, userAuth } = require('../middlewares/authorize')

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
//Post/api/users/id
router.post('/:userid', userAuth, async (req, res, next) => {
    try {
        let user = req.user
        const {userId, cartId, fulfilled} = req.body
        const order = await Order.findOne({where: {userId: user.id}})
        console.log('Line 31>>>>', order)
        const updatedOrder = await order.update({fulfilled: true})// fulfilled: true
        console.log('Line 33>>>>', updatedOrder)

        // const newOrder = await Order.createNewOrder(user.id)
        // console.log('Line 36>>>>', newOrder)
        res.send(updatedOrder)
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
