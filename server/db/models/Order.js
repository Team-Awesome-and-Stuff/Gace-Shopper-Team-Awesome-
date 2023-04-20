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

Order.createOrder = async function (userId, products) {
  const order = await Order.create({
    userId,
    fulfilled: false,
  });
  await Promise.all(
    products.map(async (product) => {
      await order.addProduct(product.id, product.quantity);
    })
  );
  return order;
};


Order.prototype.getCart = async function(id) {
  const cart = await OrderProduct.findAll({where: {orderId: id},
  include: [Product]});
  return cart
}

Order.prototype.addProduct = async function (productId, quantity = 1) {
  const orderProduct = await OrderProduct.findOne({
    where: { orderId: this.id, productId },
  });
  if (orderProduct) {
    //if product is already in cart increment quantity and save
    orderProduct.quantity += quantity;
    await orderProduct.save();
  } else {
    //if product is not in cart add it
    await OrderProduct.create({
      orderId: this.id,
      productId,
      quantity,
    });
  }
};

Order.updateOrder = async function (id, updates) {
  const order = await Order.findByPk(id);
  if (!order) throw new Error("Order not found");

  await order.update(updates);
  return order;
};





module.exports = Order;
