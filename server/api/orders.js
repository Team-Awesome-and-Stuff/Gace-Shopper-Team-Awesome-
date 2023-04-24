const express = require('express')
const router = express.Router()
const Order = require('../db/models/Order')
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
        const orders = await Order.findByPk(user.id)
        res.json(orders)
    } catch (error) {
        next(error)
    }
})
//Post/api/orders/
router.post('/', userAuth, async (req, res, next) => {
    try {
        let user = req.user
        if (!user) return res.sendStatus(401)
        // console.log('line 28 reaq.body>>>>', req.body)
        const order = await Order.create(req.body)
        res.json(order)
    } catch (error) {
        next(error)
    }
})
//Put/api/orders/id
router.put('/:id', userAuth, async (req, res, next) => {
    try {
        const order = await Order.findByPk(req.params.id)
        const orderUpdate = await order.update(req.body)
        res.json(orderUpdate)
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
