const express = require('express')
const router = express.Router()
const Cart = require('../db/models/Cart')
const { userAuth, adminAuth } = require('../middlewares/authorize')

// Get/api/carts/
router.get('/', adminAuth, async (req, res, next) => {
    try {
        let user = req.user
        if (!user) return res.sendStatus(401)
        const cart = await Cart.findAll()
        res.json(cart)
    } catch (err) {
        next(err)
    }
})
//Get/api/cart/id
router.get('/:userId', userAuth, async (req, res, next) => {
    try {
        let user = req.user
        const carts = await Cart.findByPk(user.id)
        res.json(carts)
    } catch (err) {
        next(err)
    }
})
//Post/api/cart/
router.post('/', userAuth, async (req, res, next) => {
    try {
        let user = req.user
        if (!user) return res.sendStatus(401)
        const cart = await Cart.create(req.body)
        res.json(cart)
    } catch (err) {
        next(err)
    }
})
// update Cart
//Put/api/cart/id
router.put('/:userid', userAuth, async (req, res, next) => {
    console.log(req.body)
    try {
        let user = req.user
        if (!user) return res
        const cart = await Cart.findByPk(req.params.id)
        const cartUpdate = await cart.update(req.body)
        res.json(cartUpdate)
    } catch (err) {
        next(err)
    }
})

//Delete/api/orders/id
router.delete('/:userid', userAuth, async (req, res, next) => {
    try {
        const cart = await Cart.destroy({
            where: {
                id: req.params.id,
            },
        })
        res.send({ message: `${cart} has been destroyed` })
    } catch (err) {
        next(err)
    }
})

module.exports = router
