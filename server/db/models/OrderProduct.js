const Sequelize = require("sequelize");
const db = require("../db");

const OrderProduct = db.define("orderProduct", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  orderId: {
    type: Sequelize.INTEGER,
  },
  productId: {
    type: Sequelize.INTEGER,
  },
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 1,
    allowNull: false,
  },
})

OrderProduct.getCart = async (userId) => {
    const cart = await OrderProduct.findOne({
      where: {
        userId,
        fulfilled: false,
      },
      include: [
        {
          model: Product,
          attributes: ['id', 'name', 'price', 'imageUrl'],
        }
      ]
    });
    if(!cart || cart.length === 0) {
      const error = new Error("No cart found");
    }
    return cart;
  } 
module.exports = OrderProduct;

