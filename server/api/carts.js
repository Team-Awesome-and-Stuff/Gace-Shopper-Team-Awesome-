const express = require('express')
const router = express.Router()
const Cart = require('../db/models/Cart')
const { userAuth, adminAuth } = require('../middlewares/authorize')

// Get/api/carts/
// Gets all carts
//!tested
router.get('/', adminAuth, async (req, res, next) => {
    let user = req.user
    if (!user) return res.sendStatus(401)
    const cart = await Cart.findAll()
    res.json(cart)
})

//Get/api/cart/id
//!tested good!
router.get('/:userId', userAuth, async (req, res, next) => {
    let user = req.user
    const carts = await Cart.findByPk(user.id)
    res.json(carts)
})

//Post/api/cart/
//User only
//!test good!
router.post('/', userAuth, async (req, res, next) => {
    let user = req.user
    if (!user) return res.sendStatus(401)
    // console.log('line 28 reaq.body>>>>', req.body)
    const cart = await Cart.create(req.body)
    res.json(cart)
})

//Put/api/cart/id
//update cart
//!test good!
router.put('/:id', userAuth, async (req, res, next) => {
    const cart = await Cart.findByPk(req.params.id)
    const cartUpdate = await cart.update(req.body)
    res.json(cartUpdate)
})

//Delete/api/orders/id
//delete cart
//!test good!
router.delete('/:id', async (req, res, next) => {
    const cart = await Cart.destroy({
        where: {
            id: req.params.id,
        },
    })
    res.send({ message: `${cart} has been destroyed` })
})

module.exports = router
