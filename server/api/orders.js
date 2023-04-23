const express = require('express')
const router = express.Router()
const Order = require('../db/models/Order')

// Get/api/orders/
// Gets all orders
router.get('/', async (req, res, next) => {
    const orders = await Order.findAll()
    res.json(orders)
})

//Get/api/orders/id
//todo get all orders from a customer id
router.get('/:userId', async (req, res, next) => {
    const userId = req.params.userId
    const orders = await Order.findAll({ where: { userId } })
    res.json(orders)
})

router.post('/', async (req, res, next) => {
    const order = await Order.create(req.body)
    res.json(order)
})

router.put('/:id', async (req, res, next) => {
    const order = await Order.findByPk(req.params.id)
    const orderUpdate = await order.update(req.body)
    res.json(orderUpdate)
})

router.delete('/:id', async (req, res, next) => {
    const order = await Order.destroy({
        where: {
            id: req.params.id,
        },
    })
    res.send({ message: `${order} has been destroyed` })
})

module.exports = router
