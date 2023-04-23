const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    productId: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    total: {
        type: Sequelize.INTEGER,
        allowNull: true,
    },
    fulfilled: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    cart: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    },
})
//Class methods
// Order.createOrder = async function (userId, products) {
//   const order = await Order.create({
//     userId,
//     fulfilled: false,
//   });
//   await Promise.all(
//     products.map(async (product) => {
//       console.log("add product>>>>>>>", product.id, product.quantity);
//       await order.addProduct(product.id, product.quantity);
//     })
//   );
//   return order;
// };

// Order.getOrderByUser = async function (userId) {
//     const order = await Order.findOne({
//         where: {
//             userId: userId,
//             fulfilled: false,
//         },
//         include: [
//             {
//                 model: OrderProduct,
//                 include: [Product],
//             },
//         ],
//     })
//     return order
// }

//Instance methods
// Order.prototype.updateProductQuantity = async function (productId, quantity) {
//   console.log('updating product quantity')
//   const orderProduct = await OrderProduct.findOne({
//     where: { orderId: this.id, productId },
//   });
//   if (orderProduct) {
//     // Update the quantity of the product
//     orderProduct.quantity = quantity;
//     if (quantity === 0) {
//       // Remove the product from the order if the quantity is set to 0
//       await orderProduct.destroy();
//     } else {
//       // Otherwise, save the updated quantity
//       await orderProduct.save();
//     }
//   } else {
//     // Throw an error if the product is not in the cart
//    return null;
//   }
// };

// Order.prototype.addProduct = async function (productId, quantity = 1) {
//  console.log('line 76', this.id)
//  let orderId = this.id;
//   const existingProduct = await OrderProduct.findOne({
//     where: { orderId, productId },
//   })
//   console.log('line 80', existingProduct)
//   let orderProduct;
//   if (existingProduct) {
//     orderProduct = existingProduct;
//     orderProduct.quantity += quantity;
//     await orderProduct.save();
//   } else {
//     const product = await Product.findByPk(productId);
//     orderProduct = await OrderProduct.create({
//       productId,
//       quantity,
//       orderId: this.id,
//     });
//     await this.addProduct(product, { through: { quantity: quantity } });
//   }
//   return orderProduct;
// };


module.exports = Order
