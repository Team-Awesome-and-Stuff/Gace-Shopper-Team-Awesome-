const Sequelize = require("sequelize");
const db = require("../db");
const OrderProduct = require("./OrderProduct");
const Product = require("./Product");

const Order = db.define("order", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  fulfilled: {
    type: Sequelize.BOOLEAN,
  },
  userId: {
    type: Sequelize.INTEGER,
  },
  

})

Order.prototype.getCart = async function(id) {
  const cart = await OrderProduct.findAll({where: {orderId: id},
  include: [Product]});
  return cart
}


module.exports = Order;
