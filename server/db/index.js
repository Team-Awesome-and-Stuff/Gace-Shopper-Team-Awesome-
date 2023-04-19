//this is the access point for all things database related!
const db = require("./db");
const User = require("./models/User");
const Product = require("./models/Product");
const OrderProduct = require("./models/OrderProduct");
const Order = require("./models/Order");

User.hasOne(Order);
Order.belongsTo(User);
Order.hasOne(OrderProduct);
OrderProduct.belongsTo(Order);
OrderProduct.hasMany(Product);
Product.belongsTo(OrderProduct);

module.exports = {
  db,
  models: {
    User,
    Product,
    OrderProduct,
    Order,
  },
};
