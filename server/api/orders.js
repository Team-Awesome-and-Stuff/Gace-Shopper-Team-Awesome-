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
//Get all products for the cart/order(makes products show up)
router.get('/:userId', userAuth, async (req, res, next) => {
    try {
        let user = req.user
        const order = await Order.findOne({ where: { userId: user.id } })
        const cart = await Cart.findAll({ where: { orderId: order.id } })
        res.json(cart)
    } catch (error) {
        next(error)
    }
})

//this route will increase a products quantity or creates product
//Post/api/orders/
//route works stop touching
router.post('/:userId', userAuth, async (req, res, next) => {
    try {
        let user = req.user
        let { productId, quantity } = req.body
        if (!user) return res.sendStatus(401)
        const order = await Order.findOne({ where: { userId: user.id } })
        const cart = await Cart.findOne({ where: { orderId: order.id } })
        const existingCartItem = await Cart.findOne({
            where: { orderId: order.id, productId: productId },
        })
        if (existingCartItem) {
            existingCartItem.quantity += 1
            await existingCartItem.save()
            res.json(existingCartItem)
        } else {
            const newCart = await Cart.create({
                productId: productId,
                quantity: quantity,
                orderId: cart.orderId,
            })
            res.json(newCart)
        }
    } catch (error) {
        next(error)
    }
})
// //Put/api/orders/id
// //!probably don't need
// router.put('/:userId/cart/:productId', userAuth, async (req, res, next) => {
//     try {
//         let user = req.user
//         const order = await Order.findOne({ where: { userId: user.id } })
//         const cart = await Cart.findOne({ where: { orderId: order.id } })
//         const cartUpdate = await cart.update(req.body)
//         res.json(cartUpdate)
//     } catch (error) {
//         next(error)
//     }
// })
//this route will delete a products quantity
//Delete/api/orders/id
//Works just fine, DO NOT TOUCH!!!
router.delete('/:userId/', userAuth, async (req, res, next) => {
    try {
        let user = req.user
        let { productId } = req.body
        const order = await Order.findOne({ where: { userId: user.id } })
        const cart = await Cart.findOne({ where: { orderId: order.id } })
        console.log('line 74>>>>', cart)
        const existingCartItem = await Cart.findOne({
            where: { orderId: order.id, productId: productId },
        })
        if (!existingCartItem) {
            return res.sendStatus(404).json('Item does not exist')
        }
        console.log('line 80>>>>', existingCartItem)
        if (existingCartItem.quantity === 1) {
            await existingCartItem.destroy()
            res.send({ message:  `has been destroyed` })
        } else {
            existingCartItem.quantity -= 1
            await existingCartItem.save()
            res.json(existingCartItem)
        }
    } catch (error) {
        next(error)
    }
})

module.exports = router
