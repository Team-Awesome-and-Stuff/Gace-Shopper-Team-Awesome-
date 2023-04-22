//this is the access point for all things database related!
const db = require('./db')
const User = require('./models/User')
const Order = require('./models/Order')
const Product = require('./models/Product')

User.hasMany(Order)
Order.belongsTo(User)

Order.belongsToMany(Product, { through: 'OrderProduct' })
Product.belongsToMany(Order, { through: 'OrderProduct' })

module.exports = {
    db,
    User,
    Product,
    Order,
}
