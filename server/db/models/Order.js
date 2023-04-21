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
    defaultValue: false,
  },
  userId: {
    type: Sequelize.INTEGER,
  },
  
})
//Class methods
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


Order.getOrderByUser = async function (userId) {
  const order = await Order.findOne({
    where: {
      userId: userId,
      fulfilled: false,
    },
    include: [
      {
        model: OrderProduct,
        include: [Product],
      },
    ],
  });
  return order;
};

//Instance methods

Order.prototype.addProduct = async function (productId, quantity = 1) {
  const existingProduct = await Order.updateProductQuantity({ where: { id: productId } });
  let orderProduct;
  if (existingProduct.length > 0) {
    orderProduct = existingProduct[0].orderProduct;
    orderProduct.quantity += quantity;
    await orderProduct.save();
  } else {
    const product = await Product.findByPk(productId);
    orderProduct = await OrderProduct.create({
      productId,
      quantity,
      orderId: this.id,
    });
    await this.addProduct(product, { through: { quantity: quantity } });
  }
  return orderProduct;
};


Order.prototype.updateProductQuantity = async function (productId, quantity) {
  const orderProduct = await OrderProduct.findOne({
    where: { orderId: this.id, productId },
  });
  if (orderProduct) {
    // Update the quantity of the product
    orderProduct.quantity = quantity;
    if (quantity === 0) {
      // Remove the product from the order if the quantity is set to 0
      await orderProduct.destroy();
    } else {
      // Otherwise, save the updated quantity
      await orderProduct.save();
    }
  } else {
    // Throw an error if the product is not in the cart
    throw new Error("Product not found in cart");
  }
};

module.exports = Order;
