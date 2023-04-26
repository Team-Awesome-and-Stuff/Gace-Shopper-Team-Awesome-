const Sequelize = require('sequelize')
const db = require('../db')

const Cart = db.define('cart', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    orderId: {
        type: Sequelize.INTEGER,
        allowNull: true,
    },
    productId: {
        type: Sequelize.INTEGER,
        allowNull: true,
    },
    quantity: {
        type: Sequelize.INTEGER,
        defaultValue: 1,
        allowNull: false,
    },
})

module.exports = Cart
