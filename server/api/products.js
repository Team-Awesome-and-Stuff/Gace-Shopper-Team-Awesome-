const express = require('express')
const router = express.Router()
const Product = require('../db/models/Product')
const { adminAuth } = require('../middlewares/authorize')

//Get/api/product
router.get('/', async (req, res, next) => {
    try {
    const products = await Product.findAll()
    res.json(products)
    } catch (err) {
        next(err)
    }

})
//Get/api/product/:id
router.get('/:id', async (req, res, next) => {
    try {
    const product = await Product.findByPk(req.params.id)
    res.json(product)
    } catch (err) {
        next(err)
    }
})
//Post/api/product
router.post('/', adminAuth, async (req, res, next) => {
    try {
    const product = await Product.create(req.body)
    res.json(product)
    } catch (err) {
        next(err)
    }
})
//Put/api/product/:id
router.put('/:id', adminAuth, async (req, res, next) => {
    try {
    const product = await Product.update(req.body, {
        where: {
            id: req.params.id
        }
    })
    res.json(product)
    } catch (err) {
        next(err)
    }
})
//Delete/api/product/:id
router.delete('/:id', adminAuth, async (req, res, next) => {
    try {
    const product = await Product.destroy({
        where: {
            id: req.params.id
        }
    })
    res.send({ message: `${product} has been destroyed` })
    } catch (err) {
        next(err)
    }
})

module.exports = router