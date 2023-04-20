const Sequelize = require("sequelize");
const db = require("../db");

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

module.exports = Order;
