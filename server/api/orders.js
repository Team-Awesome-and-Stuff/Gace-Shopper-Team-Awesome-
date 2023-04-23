const express = require('express')
const router = express.Router()
const Order = require('../db/models/Order')

//Get/api/orders

router.get('/', async (req, res, next) => {
    const orders = await Order.findAll()
    res.json(orders)
})

router.get('/:id', async (req, res, next) => {
    const order = await Order.findByPk(req.params.id)
    res.json(order)
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
