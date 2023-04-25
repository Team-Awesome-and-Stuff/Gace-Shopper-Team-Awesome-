const express = require('express')
const router = express.Router()
const Order = require('../db/models/Order')
const Cart = require('../db/models/Cart')
const { userAuth, adminAuth } = require('../middlewares/authorize')

// Get/api/orders/
router.get('/', adminAuth, async (req, res, next) => {
    try {
        let user = req.user
        if (!user) return res.sendStatus(401)
        const order = await Order.findAll()
        res.json(order)
    } catch (error) {
        next(error)
    }
})
//Get/api/orders/id
router.get('/:userId', userAuth, async (req, res, next) => {
    try {
        let user = req.user
        const order = await Order.findOne({ where: { userId: user.id } })
        const cart = await Cart.findOne({ where: { orderId: order.id } })
        res.json(cart)
    } catch (error) {
        next(error)
    }
})
//Post/api/orders/
router.post('/:userId', userAuth, async (req, res, next) => {
    try {
        let user = req.user
        if (!user) return res.sendStatus(401)
        const order = await Order.findOne({ where: { userId: user.id } })
        const cart = await Cart.findOne({ where: { orderId: order.id } })
        console.log('line 35>>>>>>', cart)
        console.log(req.body)
        const newCart = await cart.create(req.body)
        res.json(newCart)
    } catch (error) {
        next(error)
    }
})
//Put/api/orders/id
router.put('/:id', userAuth, async (req, res, next) => {
    try {
        let user = req.user
        const order = await Order.findOne({ where: { userId: user.id } })
        const cart = await Cart.findOne({ where: { orderId: order.id } })
        const cartUpdate = await cart.update(req.body)
        res.json(cartUpdate)
    } catch (error) {
        next(error)
    }
})
//Delete/api/orders/id
router.delete('/:id', userAuth, async (req, res, next) => {
    try {
        const order = await Order.destroy({
            where: {
                id: req.params.id,
            },
        })
        res.send({ message: `${order} has been destroyed` })
    } catch (error) {
        next(error)
    }
})

module.exports = router
