const express = require('express')
const router = express.Router()
const Product = require('../db/models/Product')

//Get/api/product
router.get('/', async (req, res, next) => {
 
    const products = await Product.findAll()
    res.json(products)

})

//Get/api/product/:id
router.get('/:id', async (req, res, next) => {
    const product = await Product.findByPk(req.params.id)
    res.json(product)
})

//Post/api/product
router.post('/', async (req, res, next) => {
    const product = await Product.create(req.body)
    res.json(product)
})

//Put/api/product/:id
router.put('/:id', async (req, res, next) => {
    const product = await Product.update(req.body, {
        where: {
            id: req.params.id
        }
    })
    res.json(product)
})


//Delete/api/product/:id
router.delete('/:id', async (req, res, next) => {
    const product = await Product.destroy({
        where: {
            id: req.params.id
        }
    })
    
    res.send({ message: `${product} has been destroyed` })
})

module.exports = router