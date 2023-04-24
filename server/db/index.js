//this is the access point for all things database related!
const db = require('./db')
const User = require('./models/User')
const Order = require('./models/Order')
const Product = require('./models/Product')
const order_product = require('./models/Order_Products')

User.hasMany(Order)
Order.belongsTo(User)

Product.belongsToMany(Order, {
    through: order_product,
})
Order.belongsToMany(Product, {
    through: order_product,
})

module.exports = {
    db,
    User,
    Product,
    Order,
}
