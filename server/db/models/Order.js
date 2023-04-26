const Sequelize = require('sequelize')
const db = require('../db')
const Cart = require('./Cart')

const Order = db.define('order', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    cartId: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    fulfilled: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    state: {
        type: Sequelize.ENUM,
        values: ['cart', 'checkout', 'purchased'],
        allowNull: false,
        defaultValue: 'cart',
    },
})


module.exports = Order
