//this is the access point for all things database related!
const db = require('./db')
const User = require('./models/User')
const Order = require('./models/Order')
const Product = require('./models/Product')
const Cart = require('./models/Cart')

User.hasMany(Order)
Order.belongsTo(User)

Product.belongsToMany(Order, {
    through: Cart,
})
Order.belongsToMany(Product, {
    through: Cart,
})

module.exports = {
    db,
    User,
    Product,
    Order,
    Cart,
}
