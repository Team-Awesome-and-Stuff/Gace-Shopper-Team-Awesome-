const express = require('express')
const router = express.Router()
const Order = require('../db/models/Order')
const { userAuth, adminAuth } = require('../middlewares/authorize')

// Get/api/orders/
// Gets all orders
//!tested good
router.get('/', adminAuth, async (req, res, next) => {
    let user = req.user
    if (!user) return res.sendStatus(401)
    const order = await Order.findAll()
    res.json(order)
})

//Get/api/orders/id
//!tested good
//todo get all orders from a customer id
router.get('/:userId', userAuth, async (req, res, next) => {
    let user = req.user
    const orders = await Order.findByPk(user.id)
    res.json(orders)
})

//Post/api/orders/
//User only
//!test good!
router.post('/', userAuth, async (req, res, next) => {
    let user = req.user
    if (!user) return res.sendStatus(401)
    // console.log('line 28 reaq.body>>>>', req.body)
    const order = await Order.create(req.body)
    res.json(order)
})

//Put/api/orders/id
//update order
//!test good!
router.put('/:id', userAuth, async (req, res, next) => {
    const order = await Order.findByPk(req.params.id)
    const orderUpdate = await order.update(req.body)
    res.json(orderUpdate)
})

//Delete/api/orders/id
//delete order
//!test good!
router.delete('/:id', async (req, res, next) => {
    const order = await Order.destroy({
        where: {
            id: req.params.id,
        },
    })
    res.send({ message: `${order} has been destroyed` })
})

//todo put to change order state to checkout

module.exports = router
