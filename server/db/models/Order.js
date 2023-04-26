const Sequelize = require('sequelize')
const db = require('../db')
const Cart = require('./Cart')
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
//Class methods
Order.createNewOrder = async function  (userid) { //userid is user.id from req.user in post route
    // const newCart = await Cart.create()
    // console.log('line 34>>>>', newCart)
    const newOrder = await Order.create({
        cartId: newCart.id,
        userId: userid,
        fulfilled: false,
        state: 'cart',
    })
    console.log('line 41>>>>', newOrder)
    // const updateNewCart = await Cart.update(
    //     { orderId: newOrder.id },
    //     { where: { id: newCart.id } }
    // )
    console.log('line 46>>>>', updateNewCart)

}




module.exports = Order
